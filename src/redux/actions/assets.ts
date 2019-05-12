import { PlayerCharacter } from '../../5e/models/Character';

export const types = {
	ASSETS: {
		OPEN_SHEET: 'ASSETS.OPEN_SHEET',
		PLAYERCHARACTER: {
			SYNC: 'ASSETS.PLAYERCHARACTER.SYNC',
			SYNC_FAILED: 'ASSETS.PLAYERCHARACTER.SYNC_FAILED',
			UPDATE: 'ASSETS.PLAYERCHARACTER.UPDATE',
			NEW: {
				SAVE: 'ASSETS.PLAYERCHARACTER.NEW.SAVE'
			}
		},
		NONPLAYERCHARACTER: {
			FILTER: {
				TEXT_CHANGE: 'ASSETS.NONPLAYERCHARACTER.FILTER.TEXT_CHANGE'
			},
			LAST_UPDATE: {
				SYNC: 'ASSETS.NONPLAYERCHARACTER.LAST_UPDATE.SYNC'
			},
			SYNC: 'ASSETS.NONPLAYERCHARACTER.SYNC',
			SYNC_FAILED: 'ASSETS.NONPLAYERCHARACTER.SYNC_FAILED',
			UPDATE: 'ASSETS.NONPLAYERCHARACTER.UPDATE',
			NEW: {
				SAVE: 'ASSETS.NONPLAYERCHARACTER.NEW.SAVE'
			}
		}
	}
};

export const openCharacterSheet = characterId => ({
	type: types.ASSETS.OPEN_SHEET,
	characterId
});

// Player Characters

export const syncPlayerCharacters = playerCharacters => ({
	type: types.ASSETS.PLAYERCHARACTER.SYNC,
	playerCharacters
});

export const syncPlayerCharactersFailed = error => ({
	type: types.ASSETS.PLAYERCHARACTER.SYNC_FAILED,
	error
});

export const updatePlayerCharacter = (characterId: string, character: PlayerCharacter) => ({
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

export const changeNonPlayerCharacterFilterText = text => ({
	type: types.ASSETS.NONPLAYERCHARACTER.FILTER.TEXT_CHANGE,
	text
});

export const updateNonPlayerCharacter = (characterId, character) => ({
	type: types.ASSETS.NONPLAYERCHARACTER.UPDATE,
	characterId,
	character
});

export const saveNewNonPlayerCharacter = nonPlayerCharacterData => ({
	type: types.ASSETS.NONPLAYERCHARACTER.NEW.SAVE,
	nonPlayerCharacterData
});

export const syncNonPlayerCharacterLastUpdate = lastUpdate => ({
	type: types.ASSETS.NONPLAYERCHARACTER.LAST_UPDATE.SYNC,
	lastUpdate
});
