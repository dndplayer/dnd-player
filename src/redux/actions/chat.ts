import { ChatMessage } from '../../models/ChatMessage';
import { Action } from 'redux';

export const types = {
	CHAT: {
		SYNC: 'CHAT.SYNC',
		SYNC_FAILED: 'CHAT.SYNC_FAILED',
		NEW: {
			// CHANGE: 'CHAT.NEW.CHANGE',
			SAVE: 'CHAT.NEW.SAVE'
		},
		OPEN: 'CHAT.OPEN',
		CLOSE: 'CHAT.CLOSE'
	}
};

// --------------------------------------------------------
// Action type interfaces
// --------------------------------------------------------

export interface SyncChatMessagesAction extends Action {
	messages: ChatMessage[];
}

export interface SaveNewMessageAction extends Action {
	message: ChatMessage;
	data: any;
}

export interface SyncChatMessagesFailedAction extends Action {
	error: any;
}

// --------------------------------------------------------
// Action creators
// --------------------------------------------------------
export const syncChatMessages = (messages): SyncChatMessagesAction => ({
	type: types.CHAT.SYNC,
	messages
});

// export const changeNewMessage = message => ({
// 	type: types.CHAT.NEW.CHANGE,
// 	message
// });

export const saveNewMessage = (message, data): SaveNewMessageAction => ({
	type: types.CHAT.NEW.SAVE,
	message,
	data
});

export const syncChatFailed = (error): SyncChatMessagesFailedAction => ({
	type: types.CHAT.SYNC_FAILED,
	error
});

export const openChat = (): Action => ({
	type: types.CHAT.OPEN
});

export const closeChat = (): Action => ({
	type: types.CHAT.CLOSE
});
