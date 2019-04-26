import { all, call, select, fork, takeEvery } from 'redux-saga/effects';

import {
	types,
	syncNonPlayerCharacters,
	syncNonPlayerCharactersFailed,
	syncPlayerCharacters,
	syncPlayerCharactersFailed,
	saveNewPlayerCharacter
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

function* syncNonPlayerCharactersSaga(): any {
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
		takeEvery(types.ASSETS.PLAYERCHARACTER.NEW.SAVE, saveNewPlayerCharacterSaga),
		takeEvery(types.ASSETS.NONPLAYERCHARACTER.NEW.SAVE, saveNewNonPlayerCharacterSaga)
	]);
}
