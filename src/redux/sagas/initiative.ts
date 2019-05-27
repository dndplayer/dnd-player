import { all, fork, takeEvery, call, select } from 'redux-saga/effects';
import firebase from 'firebase/app';
import 'firebase/database';

import rsf from '../rsf';
import {
	syncInitiativeSuccess,
	syncInitiativeFailure,
	types,
	InitiativeAddRollAction,
	InitiativeClearAction,
	InitiativeSetCurrentTurnAction,
	InitiativeRemoveAction,
	InitiativeUpdateRollAction
} from '../actions/initiative';

const initiativeTransformer = ({ value }) => value;

function* syncInitiativeSaga(): any {
	yield fork(
		rsf.database.sync,
		firebase.database(rsf.app).ref('/initiatives'),
		{
			successActionCreator: syncInitiativeSuccess,
			failureActionCreator: syncInitiativeFailure,
			transform: initiativeTransformer
		},
		'value'
	);
}

function* addInitiativeRollSaga(action: InitiativeAddRollAction): any {
	yield call(rsf.database.create, '/initiatives/rolls', action.data);
}

function* removeInitiativeRollSaga(action: InitiativeRemoveAction): any {
	yield call(rsf.database.delete, `/initiatives/rolls/${action.id}`);
}

function* clearInitiativesSaga(action: InitiativeClearAction): any {
	yield call(rsf.database.delete, '/initiatives/rolls');
}

function* setCurrentTurnSaga(action: InitiativeSetCurrentTurnAction): any {
	yield call(rsf.database.update, '/initiatives/currentTurn', action.id);
}

function* updateIntiativeRollSaga(action: InitiativeUpdateRollAction): any {
	yield call(
		rsf.database.update,
		`/initiatives/rolls/${action.initiativeId}/initiativeRoll`,
		action.newRoll
	);
}

export default function* rootSaga() {
	yield all([
		fork(syncInitiativeSaga),
		takeEvery(types.INITIATIVE.ADD_ROLL, addInitiativeRollSaga),
		takeEvery(types.INITIATIVE.REMOVE, removeInitiativeRollSaga),
		takeEvery(types.INITIATIVE.CLEAR, clearInitiativesSaga),
		takeEvery(types.INITIATIVE.SET_CURRENT_TURN, setCurrentTurnSaga),
		takeEvery(types.INITIATIVE.UPDATE.ROLL, updateIntiativeRollSaga)
	]);
}
