import { all, call, select, fork, takeEvery, put, take, delay } from 'redux-saga/effects';

import {
	Actions,
	ASSETS_NONPLAYERCHARACTER_LAST_UPDATE_SYNC,
	ASSETS_PLAYERCHARACTER_UPDATE,
	ASSETS_PLAYERCHARACTER_NEW_SAVE,
	ASSETS_NONPLAYERCHARACTER_NEW_SAVE,
	ASSETS_NONPLAYERCHARACTER_UPDATE
} from '../actions/assets';

import rsf from '../rsf';
import { database } from 'firebase';
import { AnyAction } from 'redux';

const playerCharacterTransformer = ({ value }) =>
	Object.keys(value).map(key => ({
		...value[key],
		id: key
	}));

const nonPlayerCharacterTransformer = ({ value }) =>
	Object.keys(value).map(key => ({
		...value[key],
		id: key
	}));

function* saveNewNonPlayerCharacterSaga(action: AnyAction): any {
	// TODO: Sort the payload
	const currentUser: firebase.User = yield select(state => state.auth.user);
	const payload = {
		...action.nonPlayerCharacterData,
		timestamp: database.ServerValue.TIMESTAMP,
		creator: currentUser.uid
	};

	yield call(rsf.database.create, '/nonPlayerCharacters', payload);
}

function* updatePlayerCharacterSaga(action: AnyAction): any {
	// TODO: Sort the payload
	const currentUser: firebase.User = yield select(state => state.auth.user);
	const payload = {
		...action.character,
		timestamp: database.ServerValue.TIMESTAMP,
		creator: currentUser.uid
	};

	yield call(rsf.database.patch, '/playerCharacters/' + action.characterId, payload);
}

function* saveNewPlayerCharacterSaga(action: AnyAction): any {
	// TODO: Sort the payload
	const currentUser: firebase.User = yield select(state => state.auth.user);
	const payload = {
		...action.playerCharacterData,
		timestamp: database.ServerValue.TIMESTAMP,
		creator: currentUser.uid
	};

	yield call(rsf.database.create, '/playerCharacters', payload);
}

function* syncPlayerCharactersSaga(): any {
	yield fork(
		rsf.database.sync,
		database(rsf.app).ref('/playerCharacters'),
		{
			successActionCreator: Actions.syncPlayerCharacters,
			failureActionCreator: Actions.syncPlayerCharactersFailed,
			transform: playerCharacterTransformer
		},
		'value'
	);
}

function* updateNonPlayerCharacterSaga(action: AnyAction): any {
	// TODO: Sort the payload
	const currentUser: firebase.User = yield select(state => state.auth.user);
	const payload = {
		...action.character,
		timestamp: database.ServerValue.TIMESTAMP,
		creator: currentUser.uid
	};

	yield call(rsf.database.update, '/nonPlayerCharacters/' + action.characterId, payload);
	yield call(
		rsf.database.update,
		'/lastUpdates/nonPlayerCharacters',
		database.ServerValue.TIMESTAMP
	);
}

function* syncNonPlayerCharactersSaga(): any {
	while (true) {
		yield delay(100);
		if (yield select(state => state.assets._persist.rehydrated)) {
			break;
		}
	}

	const currentLastUpdate = yield select(state => state.assets.nonPlayerCharacterLastUpdate);
	yield fork(
		rsf.database.sync,
		database(rsf.app).ref('/lastUpdates/nonPlayerCharacters'),
		{
			successActionCreator: Actions.syncNonPlayerCharacterLastUpdate
		},
		'value'
	);
	const action = yield take(ASSETS_NONPLAYERCHARACTER_LAST_UPDATE_SYNC);
	if (currentLastUpdate === action.lastUpdate) {
		// We were already up to date; wait for the next sync to tell us when something's changed.
		yield take(ASSETS_NONPLAYERCHARACTER_LAST_UPDATE_SYNC);
	}
	yield fork(
		rsf.database.sync,
		database(rsf.app).ref('/nonPlayerCharacters'),
		{
			successActionCreator: Actions.syncNonPlayerCharacters,
			failureActionCreator: Actions.syncNonPlayerCharactersFailed,
			transform: nonPlayerCharacterTransformer
		},
		'value'
	);
}

export default function* rootSaga(): any {
	yield all([
		// fork(syncAssetsSaga),
		fork(syncPlayerCharactersSaga),
		fork(syncNonPlayerCharactersSaga),
		takeEvery(ASSETS_PLAYERCHARACTER_UPDATE, updatePlayerCharacterSaga),
		takeEvery(ASSETS_PLAYERCHARACTER_NEW_SAVE, saveNewPlayerCharacterSaga),
		takeEvery(ASSETS_NONPLAYERCHARACTER_UPDATE, updateNonPlayerCharacterSaga),
		takeEvery(ASSETS_NONPLAYERCHARACTER_NEW_SAVE, saveNewNonPlayerCharacterSaga)
	]);
}
