import { types, openCharacterSheet } from '../actions/assets';
import {
	PlayerCharacter,
	NonPlayerCharacterIndex,
	NonPlayerCharacter
} from '../../5e/models/Character';

interface AssetState {
	// TODO: Perhaps these pc and npc collections should be object with
	//       key id mapping to value data, for faster lookup times. We don't
	//       really need these to be an array as we don't often iterate it and
	//       Object.keys() is good enough to handle when we do want to iterate.

	playerCharacters: PlayerCharacter[];
	nonPlayerCharactersIndex: NonPlayerCharacterIndex[];
	nonPlayerCharacters: { [key: string]: NonPlayerCharacter };

	pcSyncError?: string;
	npcSyncError?: string;
	nonPlayerCharacterFilter: string;
	activeCharacterSheetId: string;
}

const initialState: AssetState = {
	playerCharacters: [],
	nonPlayerCharactersIndex: [],
	nonPlayerCharacters: {},
	pcSyncError: null,
	npcSyncError: null,
	nonPlayerCharacterFilter: '',
	activeCharacterSheetId: null
};

export default function assetsReducer(state = initialState, action: any = {}): AssetState {
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
		case types.ASSETS.PLAYERCHARACTER.UPDATE:
			return {
				...state,
				playerCharacters: state.playerCharacters.map(item => {
					if (item.id !== action.characterId) {
						// This isn't the item we care about - keep it as-is
						return item;
					}

					// Otherwise, this is the one we want - return an updated value
					return action.character;
				})
			};
		case types.ASSETS.NONPLAYERCHARACTER.INDEX.SYNC:
			return {
				...state,
				nonPlayerCharactersIndex: action.nonPlayerCharactersIndex
			};
		case types.ASSETS.NONPLAYERCHARACTER.UPDATE:
			return {
				...state,
				nonPlayerCharacters: {
					...state.nonPlayerCharacters,
					[action.characterId]: action.character
				}
			};
		case types.ASSETS.NONPLAYERCHARACTER.FILTER.TEXT_CHANGE:
			return {
				...state,
				nonPlayerCharacterFilter: action.text
			};
		case types.ASSETS.NONPLAYERCHARACTER.LOAD_FULL_DONE:
			return {
				...state,
				nonPlayerCharacters: {
					...state.nonPlayerCharacters,
					[action.characterId]: action.character
				}
			};
		case types.ASSETS.PLAYERCHARACTER.SYNC_FAILED:
			return {
				...state,
				pcSyncError: action.error
			};
		case types.ASSETS.NONPLAYERCHARACTER.INDEX.SYNC_FAILED:
			return {
				...state,
				npcSyncError: action.error
			};
		default:
			return state;
	}
}
