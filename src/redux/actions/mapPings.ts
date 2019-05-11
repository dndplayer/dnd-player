import { Action } from 'redux';
import { MapPing } from '../../models/MapPing';

export const types = {
	MAP_PINGS: {
		SYNC: {
			NEW_PING: 'MAP_PINGS.SYNC.NEW_PING',
			FAILURE: 'MAP_PINGS.SYNC.FAILURE'
		},
		SEND_PING: 'MAP_PINGS.SEND_PING',
		ADD_PING: 'MAP_PINGS.ADD_PING',
		REMOVE_PING: 'MAP_PINGS.REMOVE_PING'
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

export interface MapPingsAddPingAction extends Action {
	uniqueId: string;
	ping: MapPing;
}

export interface MapPingsRemovePingAction extends Action {
	uniqueId: string;
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

export const mapPingsAddPing = (uniqueId: string, ping: MapPing): MapPingsAddPingAction => ({
	type: types.MAP_PINGS.ADD_PING,
	uniqueId,
	ping
});

export const mapPingsRemovePing = (uniqueId: string): MapPingsRemovePingAction => ({
	type: types.MAP_PINGS.REMOVE_PING,
	uniqueId
});
