import { all, call, put, select, takeEvery } from 'redux-saga/effects';

import { types } from '../actions/storage';

import rsf from '../rsf';

function* sendFileSaga(action): any {
	const task = rsf.storage.uploadFile(action.filePath, action.file);

	task.on('state_changed', snapshot => {
		const pct = (snapshot.bytesTransferred * 100) / snapshot.totalBytes;
		console.log(`${pct}%`);
	});

	yield task;

	try {
		const url = yield call(rsf.storage.getDownloadURL, action.filePath);

		// TODO: Add an entry in the Realtime DB for this upload
		yield call(rsf.database.create, '/uploads', {
			filePath: action.filePath,
			name: action.name,
			downloadUrl: url
		});
	} catch (error) {
		console.error(error);
	}
}

export default function* rootSaga(): any {
	yield all([takeEvery(types.STORAGE.SEND_FILE, sendFileSaga)]);
}
