import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import ChatReducer, { initialState as Chat } from './chat';
import CharactersReducer, { initialState as Characters } from './characters';
import AuthReducer, { initialState as Auth } from './auth';
import StorageReducer, { initialState as Storage } from './storage';
import ImageReducer, { initialState as Image } from './images';
import AssetReducer, { initialState as Asset } from './assets';
import MapsReducer, { initialState as Maps } from './maps';
import UiReducer, { initialState as Ui } from './ui';
import GlobalStateReducer, { initialState as GlobalState } from './globalState';
import MapPingsReducer, { initialState as MapPings } from './mapPings';
import UsersReducer, { initialState as Users } from './users';
import KeysReducer, { initialState as Keys } from './keys';
import InitiativeReducer, { initialState as Initiative } from './initiative';

export interface AppState {
	chat: typeof Chat;
	auth: typeof Auth;
	characters: typeof Characters;
	storage: typeof Storage;
	images: typeof Image;
	assets: typeof Asset;
	maps: typeof Maps;
	ui: typeof Ui;
	globalState: typeof GlobalState;
	mapPings: typeof MapPings;
	users: typeof Users;
	keys: typeof Keys;
	initiative: typeof Initiative;
}

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
		ui: UiReducer,
		globalState: GlobalStateReducer,
		mapPings: MapPingsReducer,
		users: UsersReducer,
		keys: KeysReducer,
		initiative: InitiativeReducer
	});
