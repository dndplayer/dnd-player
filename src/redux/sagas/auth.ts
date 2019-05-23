import firebase from 'firebase/app';
import 'firebase/auth';
import { all, call, fork, put, take, takeEvery, select, delay } from 'redux-saga/effects';

import { types, loginSuccess, loginFailure, logoutSuccess, logoutFailure } from '../actions/auth';

import rsf from '../rsf';
import { AppState } from '../reducers';
import { User } from '../../models/User';
import { Channel } from 'redux-saga';

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
		localStorage.removeItem('firebaseConfig');
		window.location.reload();
		// successful logout will trigger the loginStatusWatcher, which will update the state
	} catch (error) {
		yield put(logoutFailure(error));
	}
}

function* loginStatusWatcher(): any {
	// events on this channel fire when the user logs in or logs out
	const channel = yield call(rsf.auth.channel);

	while (true) {
		const { user }: { user?: firebase.User; error?: any } = yield take(channel);

		if (user) {
			yield put(loginSuccess(user));

			// Delay helps try and make sure users are loaded, really though this is a sucky way to do this!
			yield delay(2500);

			const users: { [key: string]: User } = yield select(
				(state: AppState) => state.users.users
			);

			let uid = user.uid;
			let u = users.hasOwnProperty(uid) ? users[uid] : null;
			if (!u) {
				// Defaults - Without the delay above though these reset the user every page reload/login!
				// TODO: Revisit all this and re-do a-lot of it so the user creation is more stable!
				u = {
					name: user.email,
					colour: 0xff0000
				};

				yield call(rsf.database.patch, firebase.database(rsf.app).ref(`/users/${uid}`), u);
			}
		} else {
			yield put(logoutSuccess());
		}
	}
}

export default function* loginRootSaga(): any {
	yield fork(loginStatusWatcher);
	yield all([
		takeEvery(types.LOGIN.REQUEST, loginSaga),
		takeEvery(types.LOGOUT.REQUEST, logoutSaga)
	]);
}
