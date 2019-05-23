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
			OBJECT: 'MAPS.SELECT.OBJECT',
			OBJECTS: 'MAPS.SELECT.OBJECTS'
		},
		MEASURE_MODE: {
			TOGGLE: 'MAPS.MEASURE_MODE.TOGGLE'
		},
		FOG: {
			ADD: {
				ENABLE: 'MAPS.FOG.ADD.ENABLE',
				DISABLE: 'MAPS.FOG.ADD.DISABLE',
				TOGGLE: 'MAPS.FOG.ADD.TOGGLE'
			},
			EDIT: {
				ENABLE: 'MAPS.FOG.EDIT.ENABLE',
				DISABLE: 'MAPS.FOG.EDIT.DISABLE',
				TOGGLE: 'MAPS.FOG.EDIT.TOGGLE'
			},
			UPDATE: {
				POLYGON: 'MAPS.FOG.UPDATE.POLYGON',
				COLOUR: 'MAPS.FOG.UPDATE.COLOUR'
			}
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

export interface MapsSelectObjectsAction extends Action {
	mapObjectIds: string[];
}

export interface MapsAddAssetAction extends Action {
	mapId: string;
	assetType: AssetType;
	assetId: string;
	initialData: any; // TODO: Formalize model
}

export interface MapsAddImageAction extends Action {
	mapId: string;
	imageRef: string;
	initialData: any; // TODO: Formalize model
}

export interface MapsUpdateBackgroundColourAction extends Action {
	mapId: string;
	colour: string;
}

export interface MapsRemoveObjectAction extends Action {
	mapId: string;
	mapObjectId: string;
}

export interface MapsToggleMeasureModeAction extends Action {
	val?: boolean;
}

export interface EnableFogEditModeAction extends Action {}
export interface DisableFogEditModeAction extends Action {}
export interface ToggleFogEditModeAction extends Action {}

export interface UpdateFogPolygonAction extends Action {
	mapId: string;
	fogPolygonId: string;
	position: PIXI.Point;
	points?: number[];
}

export interface UpdateFogColourAction extends Action {
	mapId: string;
	colour: string;
}

export interface EnableFogAddModeAction extends Action {}
export interface DisableFogAddModeAction extends Action {}
export interface ToggleFogAddModeAction extends Action {}

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

export const mapsAddAsset = (
	mapId,
	assetType,
	assetId,
	initialData = null
): MapsAddAssetAction => ({
	type: types.MAPS.ASSET.ADD,
	mapId,
	assetType,
	assetId,
	initialData
});

export const mapsAddImage = (mapId, imageRef, initialData = null): MapsAddImageAction => ({
	type: types.MAPS.IMAGE.ADD,
	mapId,
	imageRef,
	initialData
});

export const mapsSelectObject = (mapObjectId): MapsSelectObjectAction => ({
	type: types.MAPS.SELECT.OBJECT,
	mapObjectId
});

export const mapsSelectObjects = (mapObjectIds: string[]): MapsSelectObjectsAction => ({
	type: types.MAPS.SELECT.OBJECTS,
	mapObjectIds
});

export const mapsUpdateBackgroundColour = (mapId, colour): MapsUpdateBackgroundColourAction => ({
	type: types.MAPS.UPDATE.BACKGROUND_COLOUR,
	mapId,
	colour
});

export const mapsRemoveObject = (mapId, mapObjectId): MapsRemoveObjectAction => ({
	type: types.MAPS.REMOVE.OBJECT,
	mapId,
	mapObjectId
});

export const mapsToggleMeasureMode = (val?: boolean): MapsToggleMeasureModeAction => ({
	type: types.MAPS.MEASURE_MODE.TOGGLE,
	val
});

export const enableFogEditMode = (): EnableFogEditModeAction => ({
	type: types.MAPS.FOG.EDIT.ENABLE
});

export const disableFogEditMode = (): DisableFogEditModeAction => ({
	type: types.MAPS.FOG.EDIT.DISABLE
});

export const toggleFogEditMode = (): ToggleFogEditModeAction => ({
	type: types.MAPS.FOG.EDIT.TOGGLE
});

export const mapsUpdateFogPolygon = (
	mapId: string,
	fogPolygonId: string,
	position: PIXI.Point,
	points?: number[]
): UpdateFogPolygonAction => ({
	type: types.MAPS.FOG.UPDATE.POLYGON,
	mapId,
	fogPolygonId,
	position,
	points
});

export const mapsUpdateFogColour = (mapId: string, colour: string): UpdateFogColourAction => ({
	type: types.MAPS.FOG.UPDATE.COLOUR,
	mapId,
	colour
});

export const enableFogAddMode = (): EnableFogAddModeAction => ({
	type: types.MAPS.FOG.ADD.ENABLE
});

export const disableFogAddMode = (): DisableFogAddModeAction => ({
	type: types.MAPS.FOG.ADD.DISABLE
});

export const toggleFogAddMode = (): ToggleFogAddModeAction => ({
	type: types.MAPS.FOG.ADD.TOGGLE
});
