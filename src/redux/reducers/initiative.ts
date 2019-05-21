import {
	types,
	InitiativeSyncSuccessAction,
	InitiativeSyncFailureAction
} from '../actions/initiative';
import { InitiativeRoller, InitiativeData } from '../../models/Initiative';

interface State {
	syncError?: any;
	rolls: InitiativeData;
}

export const initialState: State = {
	syncError: null,
	rolls: null
};

export default function initiativeReducer(state: State = initialState, action: any = {}): State {
	switch (action.type) {
		case types.INITIATIVE.SYNC.SUCCESS: {
			const a = action as InitiativeSyncSuccessAction;
			return {
				...state,
				rolls: a.initiativeData
			};
		}
		case types.INITIATIVE.SYNC.FAILURE: {
			const a = action as InitiativeSyncFailureAction;
			return {
				...state,
				syncError: a.error
			};
		}
		default:
			return state;
	}
}
