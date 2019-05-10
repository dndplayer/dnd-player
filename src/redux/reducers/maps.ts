import {
	types,
	MapsSyncSuccessAction,
	MapsSyncErrorAction,
	MapsSelectObjectAction
} from '../actions/maps';
import { MapData } from '../../models/Map';

interface State {
	maps?: MapData[];
	error?: any;
	selectedObjects: string[];
}

const initialState: State = {
	maps: null,
	error: null,
	selectedObjects: []
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
		case types.MAPS.SELECT.OBJECT:
			const a = action as MapsSelectObjectAction;
			return {
				...state,
				selectedObjects: a.mapObjectId ? [a.mapObjectId] : []
			};
		default:
			return state;
	}
}
