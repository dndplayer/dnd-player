import { types } from '../actions/storage';
import { stat } from 'fs';

export const initialState = {
	uploading: false,
	url: null,
	uploadProgress: 0,
	uploadError: null
};

export default function storageReducer(state = initialState, action: any = {}) {
	switch (action.type) {
		case types.STORAGE.SEND_FILE:
			return {
				...state,
				uploading: true
			};
		case types.STORAGE.SEND_FILE_SUCCESS:
			return {
				...state,
				uploading: false
			};
		case types.STORAGE.SEND_FILE_FAILURE:
			return {
				...state,
				uploading: false,
				uploadError: action.error
			};
		case types.STORAGE.SEND_FILE_PROGRESS:
			return {
				...state,
				uploadProgress: action.progress
			};
		default:
			return state;
	}
}
