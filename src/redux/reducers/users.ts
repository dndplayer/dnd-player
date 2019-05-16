import {
	USERS_PRESENCE_SYNC,
	USERS_SYNC_FAILED,
	USERS_PRESENCE_SYNC_FAILED,
	USERS_SYNC,
	Actions
} from '../actions/users';
import { User } from '../../models/User';

interface State {
	onlineUsers: string[];
	users: { [key: string]: User };
	userPresenceSyncError: Error;
	usersSyncError: Error;
}

const initialState: State = {
	onlineUsers: [],
	users: {},
	userPresenceSyncError: null,
	usersSyncError: null
};

export default function reducer(state = initialState, action: Actions): State {
	switch (action.type) {
		case USERS_PRESENCE_SYNC:
			return {
				...state,
				onlineUsers: Object.keys(action.payload)
			};
		case USERS_PRESENCE_SYNC_FAILED:
			return {
				...state,
				userPresenceSyncError: action.payload
			};
		case USERS_SYNC:
			return {
				...state,
				users: action.payload
			};
		case USERS_SYNC_FAILED:
			return {
				...state,
				usersSyncError: action.payload
			};
		default:
			return state;
	}
}
