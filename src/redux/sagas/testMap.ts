import { all, call, fork, takeEvery } from 'redux-saga/effects';

import { types, syncTestMap, syncTestMapFailed } from '../actions/testMap';

import rsf from '../rsf';
import { database } from 'firebase';

// const testMapTransformer = ({ value }) =>
// 	Object.keys(value).map(key => ({
// 		...value[key],
// 		id: key
// 	}));
const testMapTransformer = ({ value }) => value;

function* syncTestMapSaga(): any {
	yield fork(
		rsf.database.sync,
		database(rsf.app).ref('/testMap'),
		// .orderByChild('timestamp') as any,
		{
			successActionCreator: syncTestMap,
			failureActionCreator: syncTestMapFailed,
			transform: testMapTransformer
		},
		'value'
	);
}

function* testMapUpdateObject(action): any {
	const { layerName, mapObjectId, newData } = action;
	yield call(rsf.database.patch, `/testMap/layers/${layerName}/children/${mapObjectId}`, newData);
}

export default function* rootSaga() {
	yield all([fork(syncTestMapSaga), takeEvery(types.TESTMAP.UPDATE.OBJECT, testMapUpdateObject)]);
}
