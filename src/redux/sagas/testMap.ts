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

function* testMapUpdatePosition(action): any {
	const { layerName, mapObjectId, newPosition } = action;
	yield call(
		// TODO: Swap to use patch instead of update and then make the
		// input data an object with any number of props to update, making
		// this more generic than just updatePosition.
		rsf.database.update,
		`/testMap/layers/${layerName}/children/${mapObjectId}/position`,
		newPosition
	);
}

export default function* rootSaga() {
	yield all([
		fork(syncTestMapSaga),
		takeEvery(types.TESTMAP.UPDATE.POSITION, testMapUpdatePosition)
	]);
}
