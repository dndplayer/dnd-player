import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import ChatReducer from './chat';
import AuthReducer from './auth';
import StorageReducer from './storage';
import ImageReducer from './images';

export default history =>
	combineReducers({
		router: connectRouter(history),
		chat: ChatReducer,
		auth: AuthReducer,
		storage: StorageReducer,
		images: ImageReducer
	});
