import { AssetType } from '../../models/AssetType';
import { Action } from 'redux';
import { MapData } from '../../models/Map';

export const types = {
	TESTMAP: {
		SYNC: 'TESTMAP.SYNC',
		SYNC_FAILED: 'TESTMAP.SYNC_FAILED',
		UPDATE: {
			OBJECT: 'TESTMAP.UPDATE.OBJECT'
		},
		ASSET: {
			ADD: 'TESTMAP.ASSET.ADD'
		},
		IMAGE: {
			ADD: 'TESTMAP.IMAGE.ADD'
		},
		SELECT: {
			OBJECT: 'TESTMAP.SELECT.OBJECT'
		}
	}
};

//-----------------------------------------------------------------------
// Action interfaces
//-----------------------------------------------------------------------
export interface SyncTestMapAction extends Action {
	map?: MapData;
}

export interface SyncTestMapFailedAction extends Action {
	error?: any;
}

export interface TestMapUpdateObjectAction extends Action {
	mapObjectId: string;
	newData: any;
}

export interface AddAssetToMapAction extends Action {
	assetType: AssetType;
	assetId: string;
}

export interface AddImageToMapAction extends Action {
	imageRef: string;
}

export interface SelectObjectAction extends Action {
	mapObjectId: string;
}

//-----------------------------------------------------------------------
// Action creators
//-----------------------------------------------------------------------
export const syncTestMap = (map): SyncTestMapAction => ({
	type: types.TESTMAP.SYNC,
	map
});

export const syncTestMapFailed = (error): SyncTestMapFailedAction => ({
	type: types.TESTMAP.SYNC_FAILED,
	error
});

export const testMapUpdateObject = ({ mapObjectId, newData }): TestMapUpdateObjectAction => ({
	type: types.TESTMAP.UPDATE.OBJECT,
	mapObjectId,
	newData
});

export const addAssetToMap = ({ assetType, assetId }): AddAssetToMapAction => ({
	type: types.TESTMAP.ASSET.ADD,
	assetType,
	assetId
});

export const addImageToMap = ({ imageRef }): AddImageToMapAction => ({
	type: types.TESTMAP.IMAGE.ADD,
	imageRef
});

export const selectObject = ({ mapObjectId }): SelectObjectAction => ({
	type: types.TESTMAP.SELECT.OBJECT,
	mapObjectId
});
