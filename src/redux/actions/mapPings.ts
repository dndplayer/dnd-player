import { Action } from 'redux';
import { MapPing } from '../../models/MapPing';

export const types = {
	MAP_PINGS: {
		SYNC: {
			NEW_PING: 'MAP_PINGS.SYNC.NEW_PING',
			FAILURE: 'MAP_PINGS.SYNC.FAILURE'
		},
		SEND_PING: 'MAP_PINGS.SEND_PING'
	}
};

export interface MapPingsSyncNewPingAction extends Action {
	ping: MapPing;
}

export interface MapPingsSyncFailureAction extends Action {
	error?: any;
}

export interface MapPingsSendPingAction extends Action {
	ping: MapPing;
}

//------------------------------------------------------------------------

export const mapPingsNewPing = (ping: MapPing): MapPingsSyncNewPingAction => ({
	type: types.MAP_PINGS.SYNC.NEW_PING,
	ping
});

export const mapPingsSyncFailure = (error?: any): MapPingsSyncFailureAction => ({
	type: types.MAP_PINGS.SYNC.FAILURE,
	error
});

export const mapPingsSendPing = (ping: MapPing): MapPingsSendPingAction => ({
	type: types.MAP_PINGS.SEND_PING,
	ping
});
