import { types } from '../actions/chat';

const initialState = {
	messages: [],
	new: {},
	syncError: null,
	messagesOpen: false
};

export default function reducer(state = initialState, action: any = {}) {
	switch (action.type) {
		case types.CHAT.SYNC:
			return {
				...state,
				messages: action.messages
			};
		case types.CHAT.SYNC_FAILED:
			return {
				...state,
				syncError: action.error
			};
		case types.CHAT.OPEN:
			return {
				...state,
				messagesOpen: true
			};
		case types.CHAT.CLOSE:
			return {
				...state,
				messagesOpen: false
			};
		default:
			return state;
	}
}
