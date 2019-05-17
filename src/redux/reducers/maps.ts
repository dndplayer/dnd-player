import {
	types,
	MapsSyncSuccessAction,
	MapsSyncErrorAction,
	MapsSelectObjectAction,
	MapsToggleMeasureModeAction,
	EnableFogEditModeAction,
	DisableFogEditModeAction
} from '../actions/maps';
import { MapData } from '../../models/Map';

interface State {
	maps?: MapData[];
	error?: any;
	selectedObjects: string[];
	measureModeEnabled: boolean;
	fogEditMode: boolean;
}

const initialState: State = {
	maps: null,
	error: null,
	selectedObjects: [],
	measureModeEnabled: false,
	fogEditMode: false
};

export default function mapsReducer(state: State = initialState, action: any = {}): State {
	switch (action.type) {
		case types.MAPS.SYNC.SUCCESS: {
			const a = action as MapsSyncSuccessAction;
			return {
				...state,
				maps: a.maps
			};
		}
		case types.MAPS.SYNC.ERROR: {
			const a = action as MapsSyncErrorAction;
			return {
				...state,
				error: a.error
			};
		}
		case types.MAPS.SELECT.OBJECT: {
			const a = action as MapsSelectObjectAction;
			return {
				...state,
				selectedObjects: a.mapObjectId ? [a.mapObjectId] : []
			};
		}
		case types.MAPS.MEASURE_MODE.TOGGLE: {
			const a = action as MapsToggleMeasureModeAction;
			return {
				...state,
				measureModeEnabled:
					a.val !== undefined && a.val !== null ? a.val : !state.measureModeEnabled
			};
		}
		case types.MAPS.FOG.EDIT.DISABLE: {
			return {
				...state,
				fogEditMode: false
			};
		}
		case types.MAPS.FOG.EDIT.ENABLE: {
			return {
				...state,
				fogEditMode: true
			};
		}
		default:
			return state;
	}
}
