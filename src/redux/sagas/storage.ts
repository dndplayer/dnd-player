import { channel } from 'redux-saga';
import { all, call, put, take, fork, takeEvery } from 'redux-saga/effects';
import firebase from 'firebase/app';
import 'firebase/database';
import uuidv4 from 'uuid/v4';

import { types, uploadProgress } from '../actions/storage';

import { uploadCompleted, uploadFailed } from '../actions/storage';

import rsf from '../rsf';
import { Upload } from '../../models/Upload';

const uploadFileChannel = channel();

function* sendFileSaga(action): any {
	const filePath = `uploads/${action.name}/${uuidv4()}`;
	const task = rsf.storage.uploadFile(filePath, action.file);

	task.on('state_changed', snapshot => {
		const pct = (snapshot.bytesTransferred * 100) / snapshot.totalBytes;
		console.log(`${pct}%`);
		// yield put(uploadProgress(pct));
		uploadFileChannel.put(uploadProgress(pct));
	});

	yield task;

	try {
		const url = yield call(rsf.storage.getDownloadURL, filePath);

		const payload: Upload = {
			downloadUrl: url,
			name: action.name,
			filePath: filePath,
			uploadTime: firebase.database.ServerValue.TIMESTAMP
		};
		yield call(rsf.database.create, '/uploads', payload);

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
