import { all, call, fork, takeEvery } from 'redux-saga/effects';

import { types, syncAssets, syncAssetsFailed } from '../actions/assets';

import rsf from '../rsf';
import { database } from 'firebase';

const assetTransformer = ({ value }) =>
	Object.keys(value).map(key => ({
		...value[key],
		id: key
	}));

function* syncAssetsSaga(): any {
	yield fork(
		rsf.database.sync,
		database(rsf.app)
			.ref('/assets')
			.orderByChild('name') as any,
		{
			successActionCreator: syncAssets,
			failureActionCreator: syncAssetsFailed,
			transform: assetTransformer
		},
		'value'
	);
}

export default function* rootSaga() {
	yield all([fork(syncAssetsSaga)]);
}
