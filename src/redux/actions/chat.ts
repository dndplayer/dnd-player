export const types = {
	CHAT: {
		SYNC: 'CHAT.SYNC',
		NEW: {
			// CHANGE: 'CHAT.NEW.CHANGE',
			SAVE: 'CHAT.NEW.SAVE'
		}
	}
};

export const syncChatMessages = messages => ({
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
