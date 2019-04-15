import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import ChatReducer from './chat';
import AuthReducer from './auth';

export default history =>
	combineReducers({
		router: connectRouter(history),
		chat: ChatReducer,
		auth: AuthReducer
	});
