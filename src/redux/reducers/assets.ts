import { PlayerCharacter, NonPlayerCharacter } from '../../5e/models/Character';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
	ASSETS_OPEN_SHEET,
	ASSETS_PLAYERCHARACTER_SYNC,
	ASSETS_NONPLAYERCHARACTER_FILTER_TEXT_CHANGE,
	ASSETS_NONPLAYERCHARACTER_SYNC,
	ASSETS_PLAYERCHARACTER_SYNC_FAILED,
	ASSETS_NONPLAYERCHARACTER_LAST_UPDATE_SYNC,
	Actions,
	ASSETS_NONPLAYERCHARACTER_SYNC_FAILED
} from '../actions/assets';

export interface AssetState {
	// TODO: Perhaps these pc and npc collections should be object with
	//       key id mapping to value data, for faster lookup times. We don't
	//       really need these to be an array as we don't often iterate it and
	//       Object.keys() is good enough to handle when we do want to iterate.

	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];

	pcSyncError?: Error;
	npcSyncError?: Error;
	nonPlayerCharacterFilter: string;
	activeCharacterSheetId: string;
	nonPlayerCharacterLastUpdate: number;
}

const initialState: AssetState = {
	playerCharacters: [],
	nonPlayerCharacters: [],
	pcSyncError: null,
	npcSyncError: null,
	nonPlayerCharacterFilter: '',
	activeCharacterSheetId: null,
	nonPlayerCharacterLastUpdate: null
};

function assetsReducer(state = initialState, action: Actions): AssetState {
	switch (action.type) {
		case ASSETS_OPEN_SHEET:
			return {
				...state,
				activeCharacterSheetId: action.payload
			};
		case ASSETS_PLAYERCHARACTER_SYNC:
			return {
				...state,
				playerCharacters: action.payload
			};
		case ASSETS_NONPLAYERCHARACTER_FILTER_TEXT_CHANGE:
			return {
				...state,
				nonPlayerCharacterFilter: action.payload
			};
		case ASSETS_NONPLAYERCHARACTER_SYNC:
			return {
				...state,
				nonPlayerCharacters: action.payload
			};
		case ASSETS_PLAYERCHARACTER_SYNC_FAILED:
			return {
				...state,
				pcSyncError: action.payload
			};
		case ASSETS_NONPLAYERCHARACTER_SYNC_FAILED:
			return {
				...state,
				npcSyncError: action.payload
			};
		case ASSETS_NONPLAYERCHARACTER_LAST_UPDATE_SYNC:
			return {
				...state,
				nonPlayerCharacterLastUpdate: action.payload
			};
		default:
			return state;
	}
}

const persistConfig = {
	key: 'assets',
	storage
};
export default persistReducer(persistConfig, assetsReducer);
