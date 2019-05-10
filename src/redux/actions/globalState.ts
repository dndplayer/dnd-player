import { Action } from 'redux';

export const types = {
	GLOBAL_STATE: {
		SYNC: {
			SUCCESS: 'GLOBAL_STATE.SYNC.SUCCESS',
			FAILURE: 'GLOBAL_STATE.SYNC.FAILURE'
		},
		SET_ACTIVE_MAP: 'GLOBAL_STATE.SET_ACTIVE_MAP'
	}
};

// TODO: Define the global state in a proper model

export interface GlobalStateSyncSuccessAction extends Action {
	state: any;
}

export interface GlobalStateSyncFailureAction extends Action {
	error?: any;
}

export interface GlobalSetActiveMapAction extends Action {
	mapId: string;
}

/////////////////////////////////////////////////////////////////////

export const setActiveMap = (mapId: string): GlobalSetActiveMapAction => ({
	type: types.GLOBAL_STATE.SET_ACTIVE_MAP,
	mapId
});

export const syncGlobalStateSuccess = (state: any): GlobalStateSyncSuccessAction => ({
	type: types.GLOBAL_STATE.SYNC.SUCCESS,
	state
});

export const syncGlobalStateFailure = (error: any): GlobalStateSyncFailureAction => ({
	type: types.GLOBAL_STATE.SYNC.SUCCESS,
	error
});
