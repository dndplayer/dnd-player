/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { User } from '../../models/User';
import { createAction } from '../actionHelper';
import { ActionsUnion } from '../types';

export const USERS_PRESENCE_SYNC = 'USERS.PRESENCE.SYNC';
export const USERS_PRESENCE_SYNC_FAILED = 'USERS.PRESENCE.SYNC_FAILED';
export const USERS_SYNC = 'USERS.SYNC';
export const USERS_SYNC_FAILED = 'USERS.SYNC_FAILED';

export const Actions = {
	syncUserPresence: (onlineUsers: object) =>
		createAction(USERS_PRESENCE_SYNC, { onlineUsers: onlineUsers }),
	syncUserPresenceFailed: (error: Error) => createAction(USERS_PRESENCE_SYNC_FAILED, error),
	syncUsers: (users: { [key: string]: User }) => createAction(USERS_SYNC, users),
	syncUsersFailed: (error: Error) => createAction(USERS_SYNC_FAILED, error)
};

export type Actions = ActionsUnion<typeof Actions>;
