import ChatMessage from '../../models/ChatMessage';
import { ADD_MESSAGE } from '../actions/chat';

// TODO: Convert to use immutable.js

interface ChatState {
	messages: ChatMessage[];
}

const initialState = {
	messages: []
};

export default function chatReducer(state = initialState, action): ChatState {
	switch (action.type) {
		case ADD_MESSAGE:
			return state;
		default:
			return state;
	}
}
