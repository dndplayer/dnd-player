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
	InitiativeSetCurrentTurnAction
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

function* clearInitiativesSaga(action: InitiativeClearAction): any {
	yield call(rsf.database.delete, '/initiatives/rolls');
}

function* setCurrentTurnSaga(action: InitiativeSetCurrentTurnAction): any {
	yield call(rsf.database.update, '/initiatives/currentTurn', action.id);
}

export default function* rootSaga() {
	yield all([
		fork(syncInitiativeSaga),
		takeEvery(types.INITIATIVE.ADD_ROLL, addInitiativeRollSaga),
		takeEvery(types.INITIATIVE.CLEAR, clearInitiativesSaga),
		takeEvery(types.INITIATIVE.SET_CURRENT_TURN, setCurrentTurnSaga)
	]);
}
