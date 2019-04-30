import { PlayerCharacterData } from '../../models/Asset';

export const types = {
	ASSETS: {
		PLAYERCHARACTER: {
			SYNC: 'ASSETS.PLAYERCHARACTER.SYNC',
			SYNC_FAILED: 'ASSETS.PLAYERCHARACTER.SYNC_FAILED',
			UPDATE: 'ASSETS.PLAYERCHARACTER.UPDATE',
			NEW: {
				SAVE: 'ASSETS.PLAYERCHARACTER.NEW.SAVE'
			}
		},
		NONPLAYERCHARACTER: {
			SYNC: 'ASSETS.NONPLAYERCHARACTER.SYNC',
			SYNC_FAILED: 'ASSETS.NONPLAYERCHARACTER.SYNC_FAILED',
			NEW: {
				SAVE: 'ASSETS.NONPLAYERCHARACTER.NEW.SAVE'
			}
		}
	}
};

// Player Characters

export const syncPlayerCharacters = playerCharacters => ({
	type: types.ASSETS.PLAYERCHARACTER.SYNC,
	playerCharacters
});

export const syncPlayerCharactersFailed = error => ({
	type: types.ASSETS.PLAYERCHARACTER.SYNC_FAILED,
	error
});

export const updatePlayerCharacter = (characterId: string, character: PlayerCharacterData) => ({
	type: types.ASSETS.PLAYERCHARACTER.UPDATE,
	characterId,
	character
});

export const saveNewPlayerCharacter = playerCharacterData => ({
	type: types.ASSETS.PLAYERCHARACTER.NEW.SAVE,
	playerCharacterData
});

// Non-Player Characters

export const syncNonPlayerCharacters = nonPlayerCharacters => ({
	type: types.ASSETS.NONPLAYERCHARACTER.SYNC,
	nonPlayerCharacters
});

export const syncNonPlayerCharactersFailed = error => ({
	type: types.ASSETS.NONPLAYERCHARACTER.SYNC_FAILED,
	error
});

export const saveNewNonPlayerCharacter = nonPlayerCharacterData => ({
	type: types.ASSETS.NONPLAYERCHARACTER.NEW.SAVE,
	nonPlayerCharacterData
});
