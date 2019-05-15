import {
	types,
	GlobalSetActiveMapAction,
	GlobalStateSyncFailureAction,
	GlobalStateSyncSuccessAction
} from '../actions/globalState';

interface State {
	state: any; // TODO: Define this with a proper model
	syncError?: any;
	currentTime: number;
}

const initialState: State = {
	state: null,
	syncError: null,
	currentTime: new Date().getTime()
};

export default function globalStateReducer(state: State = initialState, action: any = {}): State {
	switch (action.type) {
		case types.GLOBAL_STATE.SET_ACTIVE_MAP: {
			const a = action as GlobalSetActiveMapAction;
			return {
				state: {
					...state,
					state: {
						...state.state,
						activeMapId: a.mapId
					}
				},
				currentTime: state.currentTime
			};
		}
		case types.GLOBAL_STATE.SYNC.SUCCESS: {
			const a = action as GlobalStateSyncSuccessAction;
			return {
				...state,
				state: a.state
			};
		}
		case types.GLOBAL_STATE.SYNC.FAILURE: {
			const a = action as GlobalStateSyncFailureAction;
			return {
				...state,
				syncError: a.error
			};
		}
		case types.GLOBAL_STATE.UPDATE_TIME: {
			return {
				...state,
				currentTime: new Date().getTime()
			};
		}
		default:
			return state;
	}
}
