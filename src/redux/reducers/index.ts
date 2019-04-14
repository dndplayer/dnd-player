import { combineReducers } from 'redux';

import ChatReducer from './chat';

export default combineReducers({
	chat: ChatReducer
});
