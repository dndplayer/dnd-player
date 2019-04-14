import { all, call, fork, select, takeEvery } from 'redux-saga/effects';

import { types, syncChatMessages } from '../actions/chat';

import rsf from '../rsf';
import { firestore } from 'firebase';

function* saveNewChatMessage(action): any {
	// const msg = yield select(state => state.chat.newMessage);
	const currentUser = 'TEST'; // yield select(state => state.auth.username)
	const msg = action.message || '';
	const data = action.data || {};

	yield call(rsf.firestore.addDocument, 'chatroom', {
		sender: currentUser,
		timestamp: firestore.Timestamp.now(),
		msg,
		data
	});
}

const messageTransformer = messages => {
	const res = [];
	messages.forEach(doc =>
		res.push({
			id: doc.id,
			...doc.data()
		})
	);
	return res;
};

// To need a way to get collection on the firebase object

function* syncMessagesSaga(): any {
	yield fork(
		rsf.firestore.syncCollection,
		firestore(rsf.app)
			.collection('chatroom')
			.orderBy('timestamp', 'asc') as any,
		{
			successActionCreator: syncChatMessages,
			transform: messageTransformer
		}
	);
}

export default function* rootSaga() {
	yield all([fork(syncMessagesSaga), takeEvery(types.CHAT.NEW.SAVE, saveNewChatMessage)]);
}
