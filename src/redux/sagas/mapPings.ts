import { all, fork, takeEvery, call, put, delay } from 'redux-saga/effects';
import firebase from 'firebase/app';
import 'firebase/database';

import { v4 } from 'uuid';

import {
	mapPingsNewPing,
	mapPingsSyncFailure,
	types,
	MapPingsSyncNewPingAction,
	MapPingsSendPingAction,
	mapPingsAddPing,
	mapPingsRemovePing
} from '../actions/mapPings';

import rsf from '../rsf';

const mapPingsTransformer = ({ value }) => value;

function* syncMapPingsSaga(): any {
	yield fork(
		rsf.database.sync,
		firebase.database(rsf.app).ref('/mapPings'),
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
	// Probably just raise an action which will show the ping on the map
	// and then after a yield delay() remove said ping by sending another action
	console.log(
		`PING @ ${action.ping.position.x}, ${action.ping.position.y} by userId ${
			action.ping.userId
		}`
	);

	// TODO: Generate some unique ID to remove with later, so
	// if multiple pings come from 1 person it works as they
	// are all unique still
	const uid = v4();
	yield put(mapPingsAddPing(uid, action.ping));
	yield delay(3000);
	yield put(mapPingsRemovePing(uid));
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
