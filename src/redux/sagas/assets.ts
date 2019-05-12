import { all, call, select, fork, takeEvery, put, take, delay } from 'redux-saga/effects';

import {
	types,
	syncPlayerCharacters,
	syncPlayerCharactersFailed,
	syncNonPlayerCharacters,
	syncNonPlayerCharactersFailed,
	syncNonPlayerCharacterLastUpdate
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
			successActionCreator: syncPlayerCharacters,
			failureActionCreator: syncPlayerCharactersFailed,
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
	const currentLastUpdate = yield select();
	yield fork(
		rsf.database.sync,
		database(rsf.app).ref('/lastUpdates/nonPlayerCharacters'),
		{
			successActionCreator: syncNonPlayerCharacterLastUpdate
		},
		'value'
	);
	const action = yield take(types.ASSETS.NONPLAYERCHARACTER.LAST_UPDATE.SYNC);
	if (currentLastUpdate === action.lastUpdate) {
		// We were already up to date; wait for the next sync to tell us when something's changed.
		yield take(types.ASSETS.NONPLAYERCHARACTER.LAST_UPDATE.SYNC);
	}
	yield fork(
		rsf.database.sync,
		database(rsf.app).ref('/nonPlayerCharacters'),
		{
			successActionCreator: syncNonPlayerCharacters,
			failureActionCreator: syncNonPlayerCharactersFailed,
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
		takeEvery(types.ASSETS.PLAYERCHARACTER.UPDATE, updatePlayerCharacterSaga),
		takeEvery(types.ASSETS.PLAYERCHARACTER.NEW.SAVE, saveNewPlayerCharacterSaga),
		takeEvery(types.ASSETS.NONPLAYERCHARACTER.UPDATE, updateNonPlayerCharacterSaga),
		takeEvery(types.ASSETS.NONPLAYERCHARACTER.NEW.SAVE, saveNewNonPlayerCharacterSaga)
	]);
}
