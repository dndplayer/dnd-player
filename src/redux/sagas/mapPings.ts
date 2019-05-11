import { all, fork, takeEvery, call } from 'redux-saga/effects';
import { database } from 'firebase';

import {
	mapPingsNewPing,
	mapPingsSyncFailure,
	types,
	MapPingsSyncNewPingAction,
	MapPingsSendPingAction
} from '../actions/mapPings';

import rsf from '../rsf';

const mapPingsTransformer = ({ value }) => value;

function* syncMapPingsSaga(): any {
	yield fork(
		rsf.database.sync,
		database(rsf.app).ref('/mapPings'),
		{
			successActionCreator: mapPingsNewPing,
			failureActionCreator: mapPingsSyncFailure,
			transform: mapPingsTransformer
		},
		'child_changed'
	);
}

function* newPingSaga(action: MapPingsSyncNewPingAction): any {
	// TODO: Show ping somehow
	console.log(
		`PING @ ${action.ping.position.x}, ${action.ping.position.y} by userId ${
			action.ping.userId
		}`
	);
}

function* sendPingSaga(action: MapPingsSendPingAction): any {
	yield call(rsf.database.update, `/mapPings/${action.ping.userId}`, action.ping);
}

export default function* rootSaga() {
	yield all([
		fork(syncMapPingsSaga),
		takeEvery(types.MAP_PINGS.SYNC.NEW_PING, newPingSaga),
		takeEvery(types.MAP_PINGS.SEND_PING, sendPingSaga)
	]);
}
