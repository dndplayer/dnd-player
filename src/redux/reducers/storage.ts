import { types } from '../actions/storage';
import { stat } from 'fs';

const initialState = {
	loading: false,
	url: null
};

export default function storageReducer(state = initialState, action: any = {}) {
	switch (action.type) {
		case types.STORAGE.SEND_FILE:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
