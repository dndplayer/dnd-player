import { types, MapPingsAddPingAction, MapPingsRemovePingAction } from '../actions/mapPings';
import { MapPing } from '../../models/MapPing';

interface State {
	pings: {};
}

export const initialState: State = {
	pings: {}
};

export default function mapPingsReducer(state: State = initialState, action: any = {}): State {
	switch (action.type) {
		case types.MAP_PINGS.ADD_PING: {
			const a = action as MapPingsAddPingAction;
			return {
				...state,
				pings: { ...state.pings, [a.uniqueId]: a.ping }
			};
		}
		case types.MAP_PINGS.REMOVE_PING: {
			const a = action as MapPingsRemovePingAction;
			const { [a.uniqueId]: foo, ...remaining } = state.pings as any;
			return {
				...state,
				pings: remaining
			};
		}
		default:
			return state;
	}
}
