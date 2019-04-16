import firebase from 'firebase';
import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects';

import { types, loginSuccess, loginFailure, logoutSuccess, logoutFailure } from '../actions/auth';

import rsf from '../rsf';

// const authProvider = new firebase.auth.GoogleAuthProvider();
const emailAuthProvider = new firebase.auth.EmailAuthProvider();

function* loginSaga(action): any {
	// yield put(loginSuccess(action.username));
	try {
		// yield call(rsf.auth.signInWithPopup, emailAuthProvider);
		// yield call(rsf.auth.signInAnonymously);
		yield call(rsf.auth.signInWithEmailAndPassword, action.username, action.password);
		// successful login will trigger the loginStatusWatcher, which will update the state
	} catch (error) {
		yield put(loginFailure(error));
	}
}

function* logoutSaga(): any {
	try {
		yield call(rsf.auth.signOut);
		// successful logout will trigger the loginStatusWatcher, which will update the state
	} catch (error) {
		yield put(logoutFailure(error));
	}
}

function* loginStatusWatcher(): any {
	// events on this channel fire when the user logs in or logs out
	const channel = yield call(rsf.auth.channel);

	while (true) {
		const { user } = yield take(channel);

		if (user) yield put(loginSuccess(user));
		else yield put(logoutSuccess());
	}
}

export default function* loginRootSaga(): any {
	yield fork(loginStatusWatcher);
	yield all([
		takeEvery(types.LOGIN.REQUEST, loginSaga),
		takeEvery(types.LOGOUT.REQUEST, logoutSaga)
	]);
}
