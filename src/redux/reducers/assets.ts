import { types } from '../actions/assets';

const initialState = {
	assets: [],
	syncError: null
};

export default function assetsReducer(state = initialState, action: any = {}) {
	switch (action.type) {
		case types.ASSETS.SYNC:
			return {
				...state,
				assets: action.assets
			};
		case types.ASSETS.SYNC_FAILED:
			return {
				...state,
				syncError: action.error
			};
		default:
			return state;
	}
}
