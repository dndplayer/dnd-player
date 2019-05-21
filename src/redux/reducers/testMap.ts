import { types, SelectObjectAction } from '../actions/testMap';
import { MapData } from '../../models/Map';
import { stat } from 'fs';
import { Action } from 'redux';

interface State {
	map?: MapData;
	syncError?: any;
	selectedObjects: string[];
}

export const initialState: State = {
	map: null,
	syncError: null,
	selectedObjects: []
};

export default function imagesReducer(state = initialState, action: any = {}) {
	switch (action.type) {
		case types.TESTMAP.SYNC:
			return {
				...state,
				map: action.map
			};
		case types.TESTMAP.SYNC_FAILED:
			return {
				...state,
				syncError: action.error
			};
		case types.TESTMAP.SELECT.OBJECT:
			const a = action as SelectObjectAction;
			return {
				...state,
				selectedObjects: a.mapObjectId ? [a.mapObjectId] : []
			};
		default:
			return state;
	}
}
