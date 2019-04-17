import { channel } from 'redux-saga';
import { all, call, put, take, select, fork, takeEvery } from 'redux-saga/effects';
import { database } from 'firebase';

import { types, uploadProgress } from '../actions/storage';

import { uploadCompleted, uploadFailed } from '../actions/storage';

import rsf from '../rsf';

const uploadFileChannel = channel();

function* sendFileSaga(action): any {
	const task = rsf.storage.uploadFile(action.filePath, action.file);

	task.on('state_changed', snapshot => {
		const pct = (snapshot.bytesTransferred * 100) / snapshot.totalBytes;
		console.log(`${pct}%`);
		// yield put(uploadProgress(pct));
		uploadFileChannel.put(uploadProgress(pct));
	});

	yield task;

	try {
		const url = yield call(rsf.storage.getDownloadURL, action.filePath);

		// Add an entry in the Realtime DB for this upload
		yield call(rsf.database.create, '/uploads', {
			filePath: action.filePath,
			name: action.name,
			downloadUrl: url,
			uploadTime: database.ServerValue.TIMESTAMP
		});

		yield put(uploadCompleted());
	} catch (error) {
		console.error(error);

		yield put(uploadFailed(error));
	}
}

function* watchUploadProgressChannel(): any {
	while (true) {
		const action = yield take(uploadFileChannel);
		yield put(action);
	}
}

export default function* rootSaga(): any {
	yield fork(watchUploadProgressChannel);
	yield all([takeEvery(types.STORAGE.SEND_FILE, sendFileSaga)]);
}
