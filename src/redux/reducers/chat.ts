import { types } from '../actions/chat';

const initialState = {
	messages: [],
	new: {}
};

export default function reducer(state = initialState, action: any = {}) {
	switch (action.type) {
		case types.CHAT.SYNC:
			return {
				...state,
				messages: action.messages
			};
		default:
			return state;
	}
}
