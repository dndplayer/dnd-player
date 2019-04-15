import { all, call, put, select, takeEvery } from 'redux-saga/effects';

import { types } from '../actions/storage';

import rsf from '../rsf';
import { storage } from 'firebase';

// function* syncFileUrl(): any {
// 	try {
// 		const url = yield call(rsf.storage.getDownloadURL, filePath);
// 		// yield put(setFileURL(url));
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

// This will fail until some kind of auth is setup

function* sendFileSaga(action): any {
	const task = rsf.storage.uploadFile(action.filePath, action.file);

	task.on('state_changed', snapshot => {
		const pct = (snapshot.bytesTransferred * 100) / snapshot.totalBytes;
		console.log(`${pct}%`);
	});

	yield task;

	// yield call(syncFileUrl);
}

export default function* rootSaga(): any {
	yield all([takeEvery(types.STORAGE.SEND_FILE, sendFileSaga)]);

	// yield call(syncFileUrl);
}
