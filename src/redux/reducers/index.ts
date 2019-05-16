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
import MapPingsReducer from './mapPings';
import UsersReducer from './users';

export type State = ReturnType<ReturnType<typeof reducer>>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const reducer = (history: any) =>
	combineReducers({
		router: connectRouter(history),
		chat: ChatReducer,
		auth: AuthReducer,
		storage: StorageReducer,
		images: ImageReducer,
		assets: AssetReducer,
		maps: MapsReducer,
		characters: CharactersReducer,
		ui: UiReducer,
		globalState: GlobalStateReducer,
		mapPings: MapPingsReducer,
		users: UsersReducer
	});

export default reducer;
