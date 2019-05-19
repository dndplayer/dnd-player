import { all, call, fork, takeEvery } from 'redux-saga/effects';

import {
	types,
	syncTestMap,
	syncTestMapFailed,
	AddImageToMapAction,
	AddAssetToMapAction,
	TestMapUpdateObjectAction,
	TestMapRemoveObjectAction,
	TestMapUpdateBackgroundColour
} from '../actions/testMap';

import rsf from '../rsf';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { AssetType } from '../../models/AssetType';

const testMapTransformer = ({ value }) => value;

function* syncTestMapSaga(): any {
	yield fork(
		rsf.database.sync,
		firebase.database(rsf.app).ref('/testMap'),
		// .orderByChild('timestamp') as any,
		{
			successActionCreator: syncTestMap,
			failureActionCreator: syncTestMapFailed,
			transform: testMapTransformer
		},
		'value'
	);
}

function* testMapUpdateObject(action: TestMapUpdateObjectAction): any {
	const { mapObjectId, newData } = action;
	yield call(rsf.database.patch, `/testMap/objects/${mapObjectId}`, newData);
}

function* testMapRemoveObject(action: TestMapRemoveObjectAction): any {
	const { mapObjectId } = action;
	yield call(rsf.database.delete, `/testMap/objects/${mapObjectId}`);
}

function* updateBackgroundColour(action: TestMapUpdateBackgroundColour): any {
	const { colour } = action;
	yield call(rsf.database.update, `/testMap/backgroundColour`, colour);
}

function* addAssetToTestMap(action: AddAssetToMapAction): any {
	const { assetType, assetId } = action;
	let payload = {
		anchor: { x: 0.5, y: 0.5 },
		pivot: { x: 0.5, y: 0.5 },
		name: 'New Asset',
		position: { x: 0, y: 0 },
		rotation: 0,
		scale: { x: 1, y: 1 },
		layer: 'token'
		// TODO: TEMPORARILY REQUIRED UNTIL IT USES THE ASSET IMAGE!
		// imageUrl:
		// 	'https://firebasestorage.googleapis.com/v0/b/dnd-player-a7776.appspot.com/o/uploads%2F5e9a7b59-678a-477c-a18b-4739c9cb197a?alt=media&token=73ec57e9-87e2-44ca-9b08-4243d584cd91'
	};
	if (assetType === AssetType.PlayerCharacter) {
		payload['pcId'] = assetId;
	} else if (assetType === AssetType.NonPlayerCharacter) {
		payload['npcId'] = assetId;
	}
	yield call(rsf.database.create, '/testMap/objects', payload);
}

function* addImageToTestMap(action: AddImageToMapAction): any {
	const { imageRef } = action;
	let payload = {
		anchor: { x: 0.5, y: 0.5 },
		pivot: { x: 0.5, y: 0.5 },
		name: 'New Map Object',
		position: { x: 0, y: 0 },
		rotation: 0,
		scale: { x: 1, y: 1 },
		imageRef,
		layer: 'background'
	};
	yield call(rsf.database.create, '/testMap/objects', payload);
}

export default function* rootSaga() {
	yield all([
		fork(syncTestMapSaga),
		takeEvery(types.TESTMAP.UPDATE.OBJECT, testMapUpdateObject),
		takeEvery(types.TESTMAP.ASSET.ADD, addAssetToTestMap),
		takeEvery(types.TESTMAP.IMAGE.ADD, addImageToTestMap),
		takeEvery(types.TESTMAP.REMOVE.OBJECT, testMapRemoveObject),
		takeEvery(types.TESTMAP.UPDATE.BACKGROUND_COLOUR, updateBackgroundColour)
	]);
}
