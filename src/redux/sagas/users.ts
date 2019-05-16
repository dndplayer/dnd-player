import { all, fork, delay, takeEvery, put } from 'redux-saga/effects';

import rsf from '../rsf';
import { database, auth } from 'firebase';
import { USERS_SYNC, Actions } from '../actions/users';
import { setDm } from '../actions/auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* updatePresenceSaga(): any {
	const a = auth(rsf.app);
	while (!a.currentUser) {
		yield delay(500);
	}

	const users = database(rsf.app).ref('/userPresence/' + a.currentUser.uid);
	const online = database(rsf.app).ref('/.info/connected');
	online.on(
		'value',
		(snapshot): void => {
			if (snapshot.val()) {
				users.onDisconnect().remove();
				users.set(true);
			}
		}
	);

	yield fork(
		rsf.database.sync,
		database(rsf.app).ref('/userPresence'),
		{
			successActionCreator: Actions.syncUserPresence,
			failureActionCreator: Actions.syncUserPresenceFailed
		},
		'value'
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* updateUsersSaga(): any {
	yield fork(
		rsf.database.sync,
		database(rsf.app).ref('/users'),
		{
			successActionCreator: Actions.syncUsers,
			failureActionCreator: Actions.syncUsersFailed
		},
		'value'
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* checkDmStateSaga(action: ReturnType<typeof Actions.syncUsers>): any {
	const me = auth().currentUser;
	if (!me) {
		return;
	}

	yield put(setDm(action.payload && action.payload[me.uid] && action.payload[me.uid].dm));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function* rootSaga(): any {
	yield all([
		fork(updatePresenceSaga),
		fork(updateUsersSaga),
		takeEvery(USERS_SYNC, checkDmStateSaga)
	]);
}
