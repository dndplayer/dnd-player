import { all, fork, takeEvery, call } from 'redux-saga/effects';
import { database } from 'firebase';

import rsf from '../rsf';
import {
	mapsSyncSuccess,
	mapsSyncError,
	MapsUpdateBackgroundColourAction,
	types
} from '../actions/maps';

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

function* updateMapBackgroundColourSaga(action: MapsUpdateBackgroundColourAction): any {
	const { mapId, colour } = action;
	yield call(rsf.database.update, `/maps/${mapId}/backgroundColour`, colour);
}

export default function* rootSaga() {
	yield all([
		fork(syncMapsSaga),
		takeEvery(types.MAPS.UPDATE.BACKGROUND_COLOUR, updateMapBackgroundColourSaga)
	]);
}
