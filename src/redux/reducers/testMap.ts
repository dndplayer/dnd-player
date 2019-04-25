import { types } from '../actions/testMap';

const initialState = {
	map: null,
	syncError: null
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
		default:
			return state;
	}
}
