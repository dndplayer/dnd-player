import { Action } from 'redux';
import { MapData } from '../../models/Map';
import { AssetType } from '../../models/AssetType';

export const types = {
	MAPS: {
		SYNC: {
			SUCCESS: 'MAPS.SYNC.SUCCESS',
			ERROR: 'MAPS.SYNC.ERROR'
		},
		UPDATE: {
			OBJECT: 'MAPS.UPDATE.OBJECT',
			BACKGROUND_COLOUR: 'MAPS.UPDATE.BACKGROUND_COLOUR'
		},
		REMOVE: {
			OBJECT: 'MAPS.REMOVE.OBJECT'
		},
		ASSET: {
			ADD: 'MAPS.ASSET.ADD'
		},
		IMAGE: {
			ADD: 'MAPS.IMAGE.ADD'
		},
		SELECT: {
			OBJECT: 'MAPS.SELECT.OBJECT'
		}
	}
};

export interface MapsSyncSuccessAction extends Action {
	maps: MapData[];
}

export interface MapsSyncErrorAction extends Action {
	error: any;
}

export interface MapsUpdateObjectAction extends Action {
	mapId: string;
	mapObjectId: string;
	newData: any;
}

export interface MapsSelectObjectAction extends Action {
	mapObjectId: string;
}

export interface MapsAddAssetAction extends Action {
	mapId: string;
	assetType: AssetType;
	assetId: string;
}

export interface MapsAddImageAction extends Action {
	mapId: string;
	imageRef: string;
}

export interface MapsUpdateBackgroundColourAction extends Action {
	mapId: string;
	colour: string;
}

export interface MapsRemoveObjectAction extends Action {
	mapId: string;
	mapObjectId: string;
}

/////////////////////////////////////////////////////////////////////////////////////

export const mapsSyncSuccess = (maps: MapData[]): MapsSyncSuccessAction => ({
	type: types.MAPS.SYNC.SUCCESS,
	maps
});

export const mapsSyncError = (error: any): MapsSyncErrorAction => ({
	type: types.MAPS.SYNC.ERROR,
	error
});

export const mapsUpdateObject = (mapId, mapObjectId, newData): MapsUpdateObjectAction => ({
	type: types.MAPS.UPDATE.OBJECT,
	mapId,
	mapObjectId,
	newData
});

export const mapsAddAsset = (mapId, assetType, assetId): MapsAddAssetAction => ({
	type: types.MAPS.ASSET.ADD,
	mapId,
	assetType,
	assetId
});

export const mapsAddImage = (mapId, imageRef): MapsAddImageAction => ({
	type: types.MAPS.IMAGE.ADD,
	mapId,
	imageRef
});

export const mapsSelectObject = (mapObjectId): MapsSelectObjectAction => ({
	type: types.MAPS.SELECT.OBJECT,
	mapObjectId
});

export const mapsUpdateBackgroundColour = ({
	mapId,
	colour
}): MapsUpdateBackgroundColourAction => ({
	type: types.MAPS.UPDATE.BACKGROUND_COLOUR,
	mapId,
	colour
});

export const mapsRemoveObject = (mapId, mapObjectId): MapsRemoveObjectAction => ({
	type: types.MAPS.REMOVE.OBJECT,
	mapId,
	mapObjectId
});

// TODO: Add Memoizing ?
// ----------- State Getters
export const getCurrentMap = (state): any => {
	const maps = state.maps.maps;
	const activeMapId = state.globalState.state ? state.globalState.state.activeMapId : null;
	return activeMapId ? maps.find(x => x.id === activeMapId) : null;
};
