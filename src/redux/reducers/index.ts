import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import ChatReducer from './chat';
import CharactersReducer from './characters';
import AuthReducer from './auth';
import StorageReducer from './storage';
import ImageReducer from './images';
import AssetReducer from './assets';
import MapsReducer from './maps';
// import TestMapReducer from './testMap';
import UiReducer from './ui';
import GlobalStateReducer from './globalState';

export default history =>
	combineReducers({
		router: connectRouter(history),
		chat: ChatReducer,
		auth: AuthReducer,
		storage: StorageReducer,
		images: ImageReducer,
		assets: AssetReducer,
		maps: MapsReducer,
		characters: CharactersReducer,
		// testMap: TestMapReducer,
		ui: UiReducer,
		globalState: GlobalStateReducer
	});
