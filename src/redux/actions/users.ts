import { User } from '../../models/User';

export const USERS_PRESENCE_SYNC = 'USERS.PRESENCE.SYNC';
export const USERS_PRESENCE_SYNC_FAILED = 'USERS.PRESENCE.SYNC_FAILED';
export const USERS_SYNC = 'USERS.SYNC';
export const USERS_SYNC_FAILED = 'USERS.SYNC_FAILED';

// --------------------------------------------------------
// Action type interfaces
// --------------------------------------------------------

export type UserActionTypes =
	| SyncUserPresenceAction
	| SyncUserPresenceFailedAction
	| SyncUsersAction
	| SyncUsersFailedAction;

export interface SyncUserPresenceAction {
	type: typeof USERS_PRESENCE_SYNC;
	onlineUsers: string[];
}

export interface SyncUserPresenceFailedAction {
	type: typeof USERS_PRESENCE_SYNC_FAILED;
	error: Error;
}

export interface SyncUsersAction {
	type: typeof USERS_SYNC;
	users: { [key: string]: User };
}

export interface SyncUsersFailedAction {
	type: typeof USERS_SYNC_FAILED;
	error: Error;
}

// --------------------------------------------------------
// Action creators
// --------------------------------------------------------
export const syncUserPresence = (onlineUsers: object): SyncUserPresenceAction => ({
	type: USERS_PRESENCE_SYNC,
	onlineUsers: Object.keys(onlineUsers)
});

export const syncUserPresenceFailed = (error: Error): SyncUserPresenceFailedAction => ({
	type: USERS_PRESENCE_SYNC_FAILED,
	error
});

export const syncUsers = (users: { [key: string]: User }): SyncUsersAction => ({
	type: USERS_SYNC,
	users: users
});

export const syncUsersFailed = (error: Error): SyncUsersFailedAction => ({
	type: USERS_SYNC_FAILED,
	error
});
