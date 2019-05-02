import { ChatMessage } from '../../models/ChatMessage';
import { Action } from 'redux';

export const types = {
	CHAT: {
		SYNC: 'CHAT.SYNC',
		SYNC_FAILED: 'CHAT.SYNC_FAILED',
		NEW: {
			// CHANGE: 'CHAT.NEW.CHANGE',
			SAVE: 'CHAT.NEW.SAVE'
		}
	}
};

// --------------------------------------------------------
// Action type interfaces
// --------------------------------------------------------

interface SyncChatMessagesAction extends Action {
	messages: ChatMessage[];
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

export const saveNewMessage = (message, data) => ({
	type: types.CHAT.NEW.SAVE,
	message,
	data
});

export const syncChatFailed = error => ({
	type: types.CHAT.SYNC_FAILED,
	error
});
