import { types } from '../actions/assets';
import { PlayerCharacter, NonPlayerCharacter } from '../../5e/models/Character';
import { persistentReducer } from 'redux-pouchdb';

interface AssetState {
	// TODO: Perhaps these pc and npc collections should be object with
	//       key id mapping to value data, for faster lookup times. We don't
	//       really need these to be an array as we don't often iterate it and
	//       Object.keys() is good enough to handle when we do want to iterate.

	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];

	pcSyncError?: string;
	npcSyncError?: string;
	nonPlayerCharacterFilter: string;
	activeCharacterSheetId: string;
	nonPlayerCharacterLastUpdate: string;
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

function assetsReducer(state = initialState, action: any = {}): AssetState {
	switch (action.type) {
		case types.ASSETS.OPEN_SHEET:
			return {
				...state,
				activeCharacterSheetId: action.characterId
			};
		case types.ASSETS.PLAYERCHARACTER.SYNC:
			return {
				...state,
				playerCharacters: action.playerCharacters
			};
		case types.ASSETS.NONPLAYERCHARACTER.FILTER.TEXT_CHANGE:
			return {
				...state,
				nonPlayerCharacterFilter: action.text
			};
		case types.ASSETS.NONPLAYERCHARACTER.SYNC:
			return {
				...state,
				nonPlayerCharacters: action.nonPlayerCharacters
			};
		case types.ASSETS.PLAYERCHARACTER.SYNC_FAILED:
			return {
				...state,
				pcSyncError: action.error
			};
		case types.ASSETS.NONPLAYERCHARACTER.LAST_UPDATE.SYNC:
			return {
				...state,
				nonPlayerCharacterLastUpdate: action.lastUpdate
			};
		default:
			return state;
	}
}

export default persistentReducer(assetsReducer, 'assetsReducer');
