import { AnyAction, Action } from 'redux';
import { UploadHitAreaTypes } from '../../models/UploadHitAreaTypes';

export const types = {
	STORAGE: {
		SEND_FILE: 'STORAGE.SEND_FILE',
		SEND_FILE_SUCCESS: 'STORAGE.SEND_FILE_SUCCESS',
		SEND_FILE_FAILURE: 'STORAGE.SEND_FILE_FAILURE',
		SEND_FILE_PROGRESS: 'STORAGE.SEND_FILE_PROGRESS'
	}
};

// --------------------------------------------------------
// Action type interfaces
// --------------------------------------------------------
export interface SendFileAction extends Action {
	name: string;
	file: File;
	hitAreaType: UploadHitAreaTypes;
}

export interface UploadProgressAction extends Action {
	progress: number;
}

export interface UploadCompleteAction extends Action {}

export interface UploadFailedAction extends Action {
	error: any;
}

// --------------------------------------------------------
// Action creators
// --------------------------------------------------------
export const sendFile = (
	name: string,
	file: File,
	hitAreaType: UploadHitAreaTypes
): SendFileAction => ({
	type: types.STORAGE.SEND_FILE,
	name,
	file,
	hitAreaType
});

export const uploadProgress = (progress): UploadProgressAction => ({
	type: types.STORAGE.SEND_FILE_PROGRESS,
	progress
});
export const uploadCompleted = (): UploadCompleteAction => ({
	type: types.STORAGE.SEND_FILE_SUCCESS
});
export const uploadFailed = (error): UploadFailedAction => ({
	type: types.STORAGE.SEND_FILE_FAILURE,
	error
});
