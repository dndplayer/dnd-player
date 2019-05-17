import { User } from '../../models/User';

export const types = {
	USERS: {
		PRESENCE: {
			SYNC: 'USERS.PRESENCE.SYNC' as 'USERS.PRESENCE.SYNC',
			SYNC_FAILED: 'USERS.PRESENCE.SYNC_FAILED' as 'USERS.PRESENCE.SYNC_FAILED'
		},
		SYNC: 'USERS.SYNC' as 'USERS.SYNC',
		SYNC_FAILED: 'USERS.SYNC_FAILED' as 'USERS.SYNC_FAILED'
	}
};

// --------------------------------------------------------
// Action type interfaces
// --------------------------------------------------------

export type UserActionTypes =
	| SyncUserPresenceAction
	| SyncUserPresenceFailedAction
	| SyncUsersAction
	| SyncUsersFailedAction;

export interface SyncUserPresenceAction {
	type: typeof types.USERS.PRESENCE.SYNC;
	onlineUsers: string[];
}

export interface SyncUserPresenceFailedAction {
	type: typeof types.USERS.PRESENCE.SYNC_FAILED;
	error: Error;
}

export interface SyncUsersAction {
	type: typeof types.USERS.SYNC;
	users: { [key: string]: User };
}

export interface SyncUsersFailedAction {
	type: typeof types.USERS.SYNC_FAILED;
	error: Error;
}

// --------------------------------------------------------
// Action creators
// --------------------------------------------------------
export const syncUserPresence = (onlineUsers: object): SyncUserPresenceAction => ({
	type: types.USERS.PRESENCE.SYNC,
	onlineUsers: Object.keys(onlineUsers)
});

export const syncUserPresenceFailed = (error: Error): SyncUserPresenceFailedAction => ({
	type: types.USERS.PRESENCE.SYNC_FAILED,
	error
});

export const syncUsers = (users: { [key: string]: User }): SyncUsersAction => ({
	type: types.USERS.SYNC,
	users: users
});

export const syncUsersFailed = (error: Error): SyncUsersFailedAction => ({
	type: types.USERS.SYNC_FAILED,
	error
});
