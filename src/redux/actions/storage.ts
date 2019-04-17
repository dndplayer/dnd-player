import { AnyAction } from 'redux';

export const types = {
	STORAGE: {
		SEND_FILE: 'STORAGE.SEND_FILE',
		SEND_FILE_SUCCESS: 'STORAGE.SEND_FILE_SUCCESS',
		SEND_FILE_FAILURE: 'STORAGE.SEND_FILE_FAILURE',
		SEND_FILE_PROGRESS: 'STORAGE.SEND_FILE_PROGRESS'
	}
};

export const sendFile = (name: string, file: File, filePath: string): AnyAction => ({
	type: types.STORAGE.SEND_FILE,
	name,
	file,
	filePath
});

export const uploadProgress = progress => ({
	type: types.STORAGE.SEND_FILE_PROGRESS,
	progress
});
export const uploadCompleted = () => ({
	type: types.STORAGE.SEND_FILE_SUCCESS
});
export const uploadFailed = error => ({
	type: types.STORAGE.SEND_FILE_FAILURE,
	error
});
