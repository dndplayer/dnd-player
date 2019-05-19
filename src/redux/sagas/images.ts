import { all, fork } from 'redux-saga/effects';

import { syncImages, syncImagesFailed } from '../actions/images';

import rsf from '../rsf';
import firebase from 'firebase/app';
import 'firebase/database';

const imageTransformer = ({ value }) =>
	Object.keys(value).map(key => ({
		...value[key],
		id: key
	}));

function* syncImagesSaga(): any {
	yield fork(
		rsf.database.sync,
		firebase
			.database(rsf.app)
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
