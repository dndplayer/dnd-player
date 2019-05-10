import { PlayerCharacter } from '../../5e/models/Character';

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
			INDEX: {
				SYNC: 'ASSETS.NONPLAYERCHARACTER.INDEX.SYNC',
				SYNC_FAILED: 'ASSETS.NONPLAYERCHARACTER.INDEX.SYNC_FAILED'
			},
			FILTER: {
				TEXT_CHANGE: 'ASSETS.NONPLAYERCHARACTER.FILTER.TEXT_CHANGE'
			},
			LOAD_FULL: 'ASSETS.NONPLAYERCHARACTER.LOAD_FULL',
			LOAD_FULL_DONE: 'ASSETS.NONPLAYERCHARACTER.LOAD_FULL_DONE',
			SYNC: 'ASSETS.NONPLAYERCHARACTER.SYNC',
			SYNC_FAILED: 'ASSETS.NONPLAYERCHARACTER.SYNC_FAILED',
			UPDATE: 'ASSETS.NONPLAYERCHARACTER.UPDATE',
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

export const syncNonPlayerCharactersIndex = nonPlayerCharactersIndex => ({
	type: types.ASSETS.NONPLAYERCHARACTER.INDEX.SYNC,
	nonPlayerCharactersIndex
});

export const syncNonPlayerCharactersIndexFailed = error => ({
	type: types.ASSETS.NONPLAYERCHARACTER.INDEX.SYNC_FAILED,
	error
});

export const syncNonPlayerCharacters = nonPlayerCharacters => ({
	type: types.ASSETS.NONPLAYERCHARACTER.SYNC,
	nonPlayerCharacters
});

export const syncNonPlayerCharactersFailed = error => ({
	type: types.ASSETS.NONPLAYERCHARACTER.SYNC_FAILED,
	error
});

export const loadFullNonPlayerCharacter = characterId => ({
	type: types.ASSETS.NONPLAYERCHARACTER.LOAD_FULL,
	characterId
});

export const loadFullNonPlayerCharacterDone = (characterId, character) => ({
	type: types.ASSETS.NONPLAYERCHARACTER.LOAD_FULL_DONE,
	characterId,
	character
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
