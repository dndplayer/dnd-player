import { all, call, select, fork, takeEvery, put } from 'redux-saga/effects';

import {
	types,
	syncNonPlayerCharactersIndex,
	syncNonPlayerCharactersIndexFailed,
	syncPlayerCharacters,
	syncPlayerCharactersFailed,
	loadFullNonPlayerCharacterDone
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

function getNpcIndex(payload) {
	return {
		name: payload.name,
		cr: payload.cr,
		environments: payload.environments
	};
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
		'/nonPlayerCharacterIds/' + action.characterId,
		getNpcIndex(payload)
	);
}

function* syncNonPlayerCharactersSaga(): any {
	yield fork(
		rsf.database.sync,
		database(rsf.app).ref('/nonPlayerCharacterIds'),
		{
			successActionCreator: syncNonPlayerCharactersIndex,
			failureActionCreator: syncNonPlayerCharactersIndexFailed,
			transform: nonPlayerCharacterTransformer
		},
		'value'
	);
}

function* loadFullNonPlayerCharacterSaga(action: AnyAction): any {
	const data = yield call(
		rsf.database.read,
		database(rsf.app).ref('/nonPlayerCharacters/' + action.characterId)
	);
	yield put(loadFullNonPlayerCharacterDone(action.characterId, data));
}

export default function* rootSaga(): any {
	yield all([
		// fork(syncAssetsSaga),
		fork(syncPlayerCharactersSaga),
		fork(syncNonPlayerCharactersSaga),
		takeEvery(types.ASSETS.PLAYERCHARACTER.UPDATE, updatePlayerCharacterSaga),
		takeEvery(types.ASSETS.PLAYERCHARACTER.NEW.SAVE, saveNewPlayerCharacterSaga),
		takeEvery(types.ASSETS.NONPLAYERCHARACTER.UPDATE, updateNonPlayerCharacterSaga),
		takeEvery(types.ASSETS.NONPLAYERCHARACTER.NEW.SAVE, saveNewNonPlayerCharacterSaga),
		takeEvery(types.ASSETS.NONPLAYERCHARACTER.LOAD_FULL, loadFullNonPlayerCharacterSaga)
	]);
}
