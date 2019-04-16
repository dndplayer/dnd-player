import { AnyAction } from 'redux';

export const types = {
	STORAGE: {
		SEND_FILE: 'STORAGE.SEND_FILE'
		// SET_FILE: 'STORAGE.SET_FILE',
		// SET_FILE_URL: 'STORAGE.SET_FILE_URL'
	}
};

// export const setFile = file => ({
// 	type: types.STORAGE.SET_FILE,
// 	file
// });

// export const setFileUrl = url => ({
// 	type: types.STORAGE.SET_FILE_URL,
// 	url
// });

export const sendFile = (name: string, file: File, filePath: string): AnyAction => ({
	type: types.STORAGE.SEND_FILE,
	name,
	file,
	filePath
});
