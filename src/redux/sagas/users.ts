import { all, fork, delay, takeEvery, put, select } from 'redux-saga/effects';

import rsf from '../rsf';
import { database, auth } from 'firebase';
import {
	syncUserPresence,
	syncUserPresenceFailed,
	syncUsers,
	syncUsersFailed,
	SyncUsersAction,
	types
} from '../actions/users';
import { setCanBeDm, setDm } from '../actions/auth';

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
			successActionCreator: syncUserPresence,
			failureActionCreator: syncUserPresenceFailed
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
			successActionCreator: syncUsers,
			failureActionCreator: syncUsersFailed
		},
		'value'
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* checkDmStateSaga(action: SyncUsersAction): any {
	const me = auth().currentUser;
	if (!me) {
		return;
	}

	const isDm = action.users && action.users[me.uid] && action.users[me.uid].dm;
	const wasDm = yield select(state => state.auth.canBeDm);
	if (isDm !== wasDm) {
		yield put(setCanBeDm(isDm));
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function* rootSaga(): any {
	yield all([
		fork(updatePresenceSaga),
		fork(updateUsersSaga),
		takeEvery(types.USERS.SYNC, checkDmStateSaga)
	]);
}
