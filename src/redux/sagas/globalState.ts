import { all, fork, takeEvery, call } from 'redux-saga/effects';
import firebase from 'firebase/app';
import 'firebase/database';

import rsf from '../rsf';
import {
	syncGlobalStateSuccess,
	syncGlobalStateFailure,
	types,
	GlobalSetActiveMapAction
} from '../actions/globalState';

const globalStateTransformer = ({ value }) => value;

function* syncGlobalStateSaga(): any {
	yield fork(
		rsf.database.sync,
		firebase.database(rsf.app).ref('/globalState'),
		{
			successActionCreator: syncGlobalStateSuccess,
			failureActionCreator: syncGlobalStateFailure,
			transform: globalStateTransformer
		},
		'value'
	);
}

function* setActiveMap(action: GlobalSetActiveMapAction): any {
	yield call(rsf.database.update, '/globalState/activeMapId', action.mapId);
}

export default function* rootSaga() {
	yield all([
		fork(syncGlobalStateSaga),
		takeEvery(types.GLOBAL_STATE.SET_ACTIVE_MAP, setActiveMap)
	]);
}
