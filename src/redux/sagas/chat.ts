import { all, call, fork, select, takeEvery, put, delay } from 'redux-saga/effects';

import { types, syncChatMessages, syncChatFailed, closeChat } from '../actions/chat';

import rsf from '../rsf';
import firebase from 'firebase/app';
import 'firebase/database';
import { updateTime } from '../actions/globalState';
import { addInitiativeRoll } from '../actions/initiative';
import { AdvantageType } from '../../models/ChatMessage';

function* saveNewChatMessage(action): any {
	// const msg = yield select(state => state.chat.newMessage);
	const currentUser: firebase.User = yield select(state => state.auth.user);
	const msg = action.message || '';
	const data = action.data || {};

	if (data.type === 'roll' && data.rollType === 'Initiative') {
		let roll = 0;
		switch (data.rollAdvantageType) {
			case AdvantageType.Advantage:
				roll = Math.max(data.roll1Total, data.roll2Total);
				break;
			case AdvantageType.Disadvantage:
				roll = Math.min(data.roll1Total, data.roll2Total);
				break;
			case AdvantageType.None:
			default:
				roll = data.roll1Total;
				break;
		}

		yield put(
			addInitiativeRoll({
				initiativeRoll: roll,
				pcId: null,
				npcId: null
			})
		);
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
