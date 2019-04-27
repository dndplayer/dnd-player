import { all, call, fork, takeEvery } from 'redux-saga/effects';

import { types, syncTestMap, syncTestMapFailed } from '../actions/testMap';

import rsf from '../rsf';
import { database } from 'firebase';
import { AssetType } from '../../models/AssetType';

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

function* addAssetToTestMap(action): any {
	const { assetType, assetId } = action;
	let payload = {
		anchor: { x: 0.5, y: 0.5 },
		pivot: { x: 0.5, y: 0.5 },
		name: 'New Asset',
		position: { x: 0, y: 0 },
		rotation: 0,
		scale: { x: 1, y: 1 }
		// TODO: TEMPORARILY REQUIRED UNTIL IT USES THE ASSET IMAGE!
		// imageUrl:
		// 	'https://firebasestorage.googleapis.com/v0/b/dnd-player-a7776.appspot.com/o/uploads%2F5e9a7b59-678a-477c-a18b-4739c9cb197a?alt=media&token=73ec57e9-87e2-44ca-9b08-4243d584cd91'
	};
	if (assetType === AssetType.PlayerCharacter) {
		payload['pcId'] = assetId;
	} else if (assetType === AssetType.NonPlayerCharacter) {
		payload['npcId'] = assetId;
	}
	yield call(rsf.database.create, '/testMap/layers/tokens/children', payload);
}

export default function* rootSaga() {
	yield all([
		fork(syncTestMapSaga),
		takeEvery(types.TESTMAP.UPDATE.OBJECT, testMapUpdateObject),
		takeEvery(types.TESTMAP.ASSET.ADD, addAssetToTestMap)
	]);
}
