import { User, Journal } from '../../models/User';

export const types = {
	USERS: {
		PRESENCE: {
			SYNC: 'USERS.PRESENCE.SYNC' as 'USERS.PRESENCE.SYNC',
			SYNC_FAILED: 'USERS.PRESENCE.SYNC_FAILED' as 'USERS.PRESENCE.SYNC_FAILED'
		},
		SYNC: 'USERS.SYNC' as 'USERS.SYNC',
		SYNC_FAILED: 'USERS.SYNC_FAILED' as 'USERS.SYNC_FAILED',
		SET_COLOUR: 'USERS.SET_COLOUR' as 'USERS.SET_COLOUR',
		JOURNAL: {
			PRIVATE: {
				UPDATE: 'USERS.JOURNAL.PRIVATE.UPDATE'
			},
			PUBLIC: {
				UPDATE: 'USERS.JOURNAL.PUBLIC.UPDATE'
			}
		}
	}
};

// --------------------------------------------------------
// Action type interfaces
// --------------------------------------------------------

export type UserActionTypes =
	| SyncUserPresenceAction
	| SyncUserPresenceFailedAction
	| SyncUsersAction
	| SyncUsersFailedAction
	| SetUserColourAction
	| UpdateUserJournalPublicAction
	| UpdateUserJournalPrivateAction;

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

export interface SetUserColourAction {
	type: typeof types.USERS.SET_COLOUR;
	colour: number;
	userId: string;
}

export interface UpdateUserJournalPrivateAction {
	type: typeof types.USERS.JOURNAL.PRIVATE.UPDATE;
	userId: string;
	data: Journal;
}

export interface UpdateUserJournalPublicAction {
	type: typeof types.USERS.JOURNAL.PUBLIC.UPDATE;
	userId: string;
	data: Journal;
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

export const setUserColour = (userId: string, colour: number): SetUserColourAction => ({
	type: types.USERS.SET_COLOUR,
	userId,
	colour
});

export const updatePrivateJournal = (
	userId: string,
	data: Journal
): UpdateUserJournalPrivateAction => ({
	type: types.USERS.JOURNAL.PRIVATE.UPDATE,
	userId,
	data
});

export const updatePublicJournal = (
	userId: string,
	data: Journal
): UpdateUserJournalPublicAction => ({
	type: types.USERS.JOURNAL.PUBLIC.UPDATE,
	userId,
	data
});
