import { all, call, fork, takeEvery } from 'redux-saga/effects';

import { types, syncImages, syncImagesFailed } from '../actions/images';

import rsf from '../rsf';
import { database } from 'firebase';

const imageTransformer = ({ value }) =>
	Object.keys(value).map(key => ({
		...value[key],
		id: key
	}));

function* syncImagesSaga(): any {
	yield fork(
		rsf.database.sync,
		database(rsf.app)
			.ref('/uploads')
			.orderByChild('timestamp') as any,
		{
			successActionCreator: syncImages,
			failureActionCreator: syncImagesFailed,
			transform: imageTransformer
		},
		'value'
	);
}

export default function* rootSaga() {
	yield all([fork(syncImagesSaga)]);
}
