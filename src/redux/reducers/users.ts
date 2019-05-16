import {
	UserActionTypes,
	USERS_PRESENCE_SYNC,
	USERS_SYNC_FAILED,
	USERS_PRESENCE_SYNC_FAILED,
	USERS_SYNC
} from '../actions/users';
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
		case USERS_PRESENCE_SYNC:
			return {
				...state,
				onlineUsers: action.onlineUsers
			};
		case USERS_PRESENCE_SYNC_FAILED:
			return {
				...state,
				userPresenceSyncError: action.error
			};
		case USERS_SYNC:
			return {
				...state,
				users: action.users
			};
		case USERS_SYNC_FAILED:
			return {
				...state,
				usersSyncError: action.error
			};
		default:
			return state;
	}
}
