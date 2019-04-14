import { combineReducers } from 'redux';

import ChatReducer from './chat';
import AuthReducer from './auth';

export default combineReducers({
	chat: ChatReducer,
	auth: AuthReducer
});
