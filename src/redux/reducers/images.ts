import { types } from '../actions/images';
import { Upload } from '../../models/Upload';

interface State {
	images: Upload[];
	syncError?: object;
}

export const initialState: State = {
	images: [],
	syncError: null
};

export default function imagesReducer(state: State = initialState, action: any = {}): State {
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
