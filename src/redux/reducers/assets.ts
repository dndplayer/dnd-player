import { types } from '../actions/assets';

interface PlayerCharacterData {
	id: string;
	name: string;
}

interface NonPlayerCharacterData {
	id: string;
	name: string;
}

interface AssetState {
	// TODO: Perhaps these pc and npc collections should be object with
	//       key id mapping to value data, for faster lookup times. We don't
	//       really need these to be an array as we don't often iterate it and
	//       Object.keys() is good enough to handle when we do want to iterate.

	playerCharacters: PlayerCharacterData[];
	nonPlayerCharacters: NonPlayerCharacterData[];

	pcSyncError?: string;
	npcSyncError?: string;

	playerCharacterDragData?: any;
	nonPlayerCharacterDragData?: any;
}

const initialState: AssetState = {
	playerCharacters: [],
	nonPlayerCharacters: [],

	pcSyncError: null,
	npcSyncError: null,

	playerCharacterDragData: null,
	nonPlayerCharacterDragData: null
};

export default function assetsReducer(state = initialState, action: any = {}): AssetState {
	switch (action.type) {
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
		case types.ASSETS.NONPLAYERCHARACTER.SYNC_FAILED:
			return {
				...state,
				npcSyncError: action.error
			};
		case types.ASSETS.PLAYERCHARACTER.DRAG.START:
			return {
				...state,
				playerCharacterDragData: action.dragData
			};
		case types.ASSETS.PLAYERCHARACTER.DRAG.END:
			return {
				...state,
				playerCharacterDragData: action.dragData
			};
		case types.ASSETS.NONPLAYERCHARACTER.DRAG.START:
			return {
				...state,
				nonPlayerCharacterDragData: action.dragData
			};
		case types.ASSETS.NONPLAYERCHARACTER.DRAG.END:
			return {
				...state,
				nonPlayerCharacterDragData: action.dragData
			};
		default:
			return state;
	}
}
