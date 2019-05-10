import { all, fork, takeEvery, call } from 'redux-saga/effects';
import { database } from 'firebase';

import rsf from '../rsf';
import { mapsSyncSuccess, mapsSyncError } from '../actions/maps';

const mapsTransformer = ({ value }) =>
	Object.keys(value).map(key => ({
		...value[key],
		id: key
	}));

function* syncMapsSaga(): any {
	yield fork(
		rsf.database.sync,
		database(rsf.app).ref('/maps'),
		{
			successActionCreator: mapsSyncSuccess,
			failureActionCreator: mapsSyncError,
			transform: mapsTransformer
		},
		'value'
	);
}

export default function* rootSaga() {
	yield all([fork(syncMapsSaga)]);
}
