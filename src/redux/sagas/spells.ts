import { all, call, select, fork, takeEvery, take, delay } from 'redux-saga/effects';

import { types, syncSpells, syncSpellsFailed, syncSpellLastUpdate } from '../actions/spells';

import rsf from '../rsf';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { AnyAction } from 'redux';

const spellTransformer = ({ value }) =>
	Object.keys(value).map(key => ({
		...value[key],
		id: key
	}));

function* saveNewSpellSaga(action: AnyAction): any {
	const currentUser: firebase.User = yield select(state => state.auth.user);
	const payload = {
		...action.spell,
		timestamp: firebase.database.ServerValue.TIMESTAMP,
		creator: currentUser.uid
	};

	yield call(rsf.database.create, '/spells', payload);
	yield call(rsf.database.update, '/lastUpdates/spells', firebase.database.ServerValue.TIMESTAMP);
}

function* updateSpellSaga(action: AnyAction): any {
	const currentUser: firebase.User = yield select(state => state.auth.user);
	const payload = {
		...action.spell,
		timestamp: firebase.database.ServerValue.TIMESTAMP,
		creator: currentUser.uid
	};

	yield call(rsf.database.update, '/spells/' + action.spellId, payload);
	yield call(rsf.database.update, '/lastUpdates/spells', firebase.database.ServerValue.TIMESTAMP);
}

function* syncSpellsSaga(): any {
	while (true) {
		yield delay(100);
		if (yield select(state => state.assets._persist.rehydrated)) {
			break;
		}
	}

	const currentLastUpdate = yield select(state => state.spells.lastUpdate);
	yield fork(
		rsf.database.sync,
		firebase.database(rsf.app).ref('/lastUpdates/spells'),
		{
			successActionCreator: syncSpellLastUpdate
		},
		'value'
	);
	const action = yield take(types.SPELLS.LAST_UPDATE.SYNC);
	if (currentLastUpdate === action.lastUpdate) {
		// We were already up to date; wait for the next sync to tell us when something's changed.
		yield take(types.SPELLS.LAST_UPDATE.SYNC);
	}
	yield fork(
		rsf.database.sync,
		firebase.database(rsf.app).ref('/spells'),
		{
			successActionCreator: syncSpells,
			failureActionCreator: syncSpellsFailed,
			transform: spellTransformer
		},
		'value'
	);
}

export default function* rootSaga(): any {
	yield all([
		fork(syncSpellsSaga),
		takeEvery(types.SPELLS.UPDATE, updateSpellSaga),
		takeEvery(types.SPELLS.NEW.SAVE, saveNewSpellSaga)
	]);
}
