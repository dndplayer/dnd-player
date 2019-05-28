import { all, fork, delay, takeEvery, put, select, call } from 'redux-saga/effects';

import rsf from '../rsf';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {
	syncUserPresence,
	syncUserPresenceFailed,
	syncUsers,
	syncUsersFailed,
	SyncUsersAction,
	types,
	SetUserColourAction,
	UpdateUserJournalPrivateAction,
	UpdateUserJournalPublicAction
} from '../actions/users';
import { setCanBeDm } from '../actions/auth';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* updatePresenceSaga(): any {
	const a = firebase.auth(rsf.app);
	while (!a.currentUser) {
		yield delay(500);
	}

	const users = firebase.database(rsf.app).ref('/userPresence/' + a.currentUser.uid);
	const online = firebase.database(rsf.app).ref('/.info/connected');
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
		firebase.database(rsf.app).ref('/userPresence'),
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
		firebase.database(rsf.app).ref('/users'),
		{
			successActionCreator: syncUsers,
			failureActionCreator: syncUsersFailed
		},
		'value'
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* checkDmStateSaga(action: SyncUsersAction): any {
	const me = firebase.auth().currentUser;
	if (!me) {
		return;
	}

	const isDm = action.users && action.users[me.uid] && action.users[me.uid].dm;
	const wasDm = yield select(state => state.auth.canBeDm);
	if (isDm !== wasDm) {
		yield put(setCanBeDm(isDm));
	}
}

function* setUserColourSaga(action: SetUserColourAction): any {
	yield call(rsf.database.patch, firebase.database(rsf.app).ref(`/users/${action.userId}`), {
		colour: action.colour
	});
}

function* updatePrivateJournal(action: UpdateUserJournalPrivateAction): any {
	yield call(
		rsf.database.patch,
		firebase.database(rsf.app).ref(`/users/${action.userId}/journal/private`),
		action.data
	);
}

function* updatePublicJournal(action: UpdateUserJournalPublicAction): any {
	yield call(
		rsf.database.patch,
		firebase.database(rsf.app).ref(`/users/${action.userId}/journal/public`),
		action.data
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function* rootSaga(): any {
	yield all([
		fork(updatePresenceSaga),
		fork(updateUsersSaga),
		takeEvery(types.USERS.SYNC, checkDmStateSaga),
		takeEvery(types.USERS.SET_COLOUR, setUserColourSaga),
		takeEvery(types.USERS.JOURNAL.PRIVATE.UPDATE, updatePrivateJournal),
		takeEvery(types.USERS.JOURNAL.PUBLIC.UPDATE, updatePublicJournal)
	]);
}
