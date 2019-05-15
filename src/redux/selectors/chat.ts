import { createSelector } from 'reselect';

const messages = state => state.chat.messages;
const currentTime = state => state.globalState.currentTime;

export const getRecentMessages = createSelector(
	messages,
	currentTime,
	(messages, currentTime) =>
		!messages ? [] : [].concat(messages).filter(x => x.timestamp > currentTime - 7000)
);
