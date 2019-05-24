import { all, call, fork, select, takeEvery, put, delay } from 'redux-saga/effects';

import { Howl, Howler } from 'howler';

import { types, syncChatMessages, syncChatFailed, closeChat } from '../actions/chat';

import rsf from '../rsf';
import firebase from 'firebase/app';
import 'firebase/database';
import { updateTime } from '../actions/globalState';
import { addInitiativeRoll } from '../actions/initiative';
import { AdvantageType, RollData } from '../../models/ChatMessage';
import { AppState } from '../reducers';

// This isn't neccessarily ideal, having this as a global
// variable, but should work for now to limit repeat sounds.
let lastSoundPlayedAt: number = null;

function* saveNewChatMessage(action): any {
	// const msg = yield select(state => state.chat.newMessage);
	const currentUser: firebase.User = yield select(state => state.auth.user);
	const msg = action.message || '';
	const data = action.data || {};

	if (data.type === 'roll') {
		const d = data as RollData;

		if (d.rollType === 'Initiative') {
			let roll = 0;
			switch (d.rollAdvantageType) {
				case AdvantageType.Advantage:
					roll = Math.max(d.roll1Total, d.roll2Total);
					break;
				case AdvantageType.Disadvantage:
					roll = Math.min(d.roll1Total, d.roll2Total);
					break;
				case AdvantageType.None:
				default:
					roll = d.roll1Total;
					break;
			}

			yield put(
				addInitiativeRoll({
					initiativeRoll: roll,
					pcId: d.pcId,
					npcTokenId: d.npcTokenId
				})
			);
		}
	}

	yield put(closeChat());
	yield call(rsf.database.create, '/chatroom', {
		sender: currentUser.email,
		// timestamp: firestore.Timestamp.now(), // Firestore way
		timestamp: firebase.database.ServerValue.TIMESTAMP, // Database way
		msg,
		data
	});
}

const messageTransformer = ({ value }) =>
	Object.keys(value).map(key => ({
		...value[key],
		id: key
	}));

function* syncMessagesSaga(): any {
	yield fork(
		rsf.database.sync,
		firebase
			.database(rsf.app)
			.ref('/chatroom')
			.orderByChild('timestamp')
			.limitToLast(100) as any,
		{
			successActionCreator: syncChatMessages,
			failureActionCreator: syncChatFailed,
			transform: messageTransformer
		},
		'value'
	);
}

function* updateCurrentTimeSaga(): any {
	const soundsMuted = yield select((state: AppState) => state.ui.soundsMuted);
	const now = new Date().getTime();
	if (!soundsMuted && (!lastSoundPlayedAt || lastSoundPlayedAt < now - 800)) {
		lastSoundPlayedAt = now;
		var sound = new Howl({
			src: [`${process.env.PUBLIC_URL}/sounds/plucky.mp3`]
		});

		sound.play();
	}

	yield delay(7000);
	yield put(updateTime());
}

export default function* rootSaga() {
	yield all([
		fork(syncMessagesSaga),
		takeEvery(types.CHAT.NEW.SAVE, saveNewChatMessage),
		takeEvery(types.CHAT.SYNC, updateCurrentTimeSaga)
	]);
}
