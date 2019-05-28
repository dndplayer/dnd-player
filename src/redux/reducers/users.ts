import {
	types,
	SyncUserPresenceAction,
	SyncUserPresenceFailedAction,
	SyncUsersAction,
	SyncUsersFailedAction
} from '../actions/users';
import { User } from '../../models/User';
import { Action } from 'redux';

export interface UsersState {
	onlineUsers: string[];
	users: { [key: string]: User };
	userPresenceSyncError: Error;
	usersSyncError: Error;
}
export const initialState: UsersState = {
	onlineUsers: [],
	users: {},
	userPresenceSyncError: null,
	usersSyncError: null
};

export default function reducer(state = initialState, action: Action): UsersState {
	switch (action.type) {
		case types.USERS.PRESENCE.SYNC: {
			const a = action as SyncUserPresenceAction;
			return {
				...state,
				onlineUsers: a.onlineUsers
			};
		}
		case types.USERS.PRESENCE.SYNC_FAILED: {
			const a = action as SyncUserPresenceFailedAction;
			return {
				...state,
				userPresenceSyncError: a.error
			};
		}
		case types.USERS.SYNC: {
			const a = action as SyncUsersAction;
			return {
				...state,
				users: a.users
			};
		}
		case types.USERS.SYNC_FAILED: {
			const a = action as SyncUsersFailedAction;
			return {
				...state,
				usersSyncError: a.error
			};
		}
		default:
			return state;
	}
}
