import { all, call, select, fork, takeEvery } from 'redux-saga/effects';

import { types, syncAssets, syncAssetsFailed } from '../actions/assets';

import rsf from '../rsf';
import { database } from 'firebase';
import { AnyAction } from 'redux';

const assetTransformer = ({ value }) =>
	Object.keys(value).map(key => ({
		...value[key],
		id: key
	}));

function* saveNewAsset(action: AnyAction): any {
	const currentUser: firebase.User = yield select(state => state.auth.user);
	const asset = action.asset;

	yield call(rsf.database.create, '/assets', {
		...asset,
		creator: currentUser.uid,
		timestamp: database.ServerValue.TIMESTAMP
	});
}

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
	yield all([fork(syncAssetsSaga), takeEvery(types.ASSETS.NEW.SAVE, saveNewAsset)]);
}
