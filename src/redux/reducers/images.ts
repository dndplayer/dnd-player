import { types } from '../actions/images';

const initialState = {
	images: [],
	syncError: null
};

export default function imagesReducer(state = initialState, action: any = {}) {
	switch (action.type) {
		case types.IMAGES.SYNC:
			return {
				...state,
				images: action.images
			};
		case types.IMAGES.SYNC_FAILED:
			return {
				...state,
				syncError: action.error
			};
		default:
			return state;
	}
}
