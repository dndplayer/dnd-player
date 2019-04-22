import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import ChatReducer from './chat';
import CharactersReducer from './characters';
import AuthReducer from './auth';
import StorageReducer from './storage';
import ImageReducer from './images';
import AssetReducer from './assets';
import MapReducer from './map';

export default history =>
	combineReducers({
		router: connectRouter(history),
		chat: ChatReducer,
		auth: AuthReducer,
		storage: StorageReducer,
		images: ImageReducer,
		assets: AssetReducer,
		map: MapReducer,
		characters: CharactersReducer
	});
