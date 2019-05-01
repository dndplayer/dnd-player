import { all, call, fork, select, takeEvery } from 'redux-saga/effects';

import { types, syncChatMessages, syncChatFailed } from '../actions/chat';

import rsf from '../rsf';
import { database } from 'firebase';

function* saveNewChatMessage(action): any {
	// const msg = yield select(state => state.chat.newMessage);
	const currentUser: firebase.User = yield select(state => state.auth.user);
	const msg = action.message || '';
	const data = action.data || {};

	yield call(rsf.database.create, '/chatroom', {
		sender: currentUser.email,
		// timestamp: firestore.Timestamp.now(), // Firestore way
		timestamp: database.ServerValue.TIMESTAMP, // Database way
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
		database(rsf.app)
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

export default function* rootSaga() {
	yield all([fork(syncMessagesSaga), takeEvery(types.CHAT.NEW.SAVE, saveNewChatMessage)]);
}
