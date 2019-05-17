import { UserActionTypes, types } from '../actions/users';
import { User } from '../../models/User';

export interface UsersState {
	onlineUsers: string[];
	users: { [key: string]: User };
	userPresenceSyncError: Error;
	usersSyncError: Error;
}
const initialState: UsersState = {
	onlineUsers: [],
	users: {},
	userPresenceSyncError: null,
	usersSyncError: null
};

export default function reducer(state = initialState, action: UserActionTypes): UsersState {
	switch (action.type) {
		case types.USERS.PRESENCE.SYNC:
			return {
				...state,
				onlineUsers: action.onlineUsers
			};
		case types.USERS.PRESENCE.SYNC_FAILED:
			return {
				...state,
				userPresenceSyncError: action.error
			};
		case types.USERS.SYNC:
			return {
				...state,
				users: action.users
			};
		case types.USERS.SYNC_FAILED:
			return {
				...state,
				usersSyncError: action.error
			};
		default:
			return state;
	}
}
