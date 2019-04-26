export const types = {
	ASSETS: {
		PLAYERCHARACTER: {
			SYNC: 'ASSETS.PLAYERCHARACTER.SYNC',
			SYNC_FAILED: 'ASSETS.PLAYERCHARACTER.SYNC_FAILED',
			UPDATE: 'ASSETS.PLAYERCHARACTER.UPDATE',
			NEW: {
				SAVE: 'ASSETS.PLAYERCHARACTER.NEW.SAVE'
			},
			DRAG: {
				START: 'ASSETS.PLAYERCHARACTER.DRAG.START',
				END: 'ASSETS.PLAYERCHARACTER.DRAG.END'
			}
		},
		NONPLAYERCHARACTER: {
			SYNC: 'ASSETS.NONPLAYERCHARACTER.SYNC',
			SYNC_FAILED: 'ASSETS.NONPLAYERCHARACTER.SYNC_FAILED',
			NEW: {
				SAVE: 'ASSETS.NONPLAYERCHARACTER.NEW.SAVE'
			},
			DRAG: {
				START: 'ASSETS.NONPLAYERCHARACTER.DRAG.START',
				END: 'ASSETS.NONPLAYERCHARACTER.DRAG.END'
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

export const updatePlayerCharacter = (characterId, character) => ({
	type: types.ASSETS.PLAYERCHARACTER.UPDATE,
	characterId,
	character
});

export const saveNewPlayerCharacter = playerCharacterData => ({
	type: types.ASSETS.PLAYERCHARACTER.NEW.SAVE,
	playerCharacterData
});

export const playerCharacterDragStart = dragData => ({
	type: types.ASSETS.PLAYERCHARACTER.DRAG.START,
	dragData
});

export const playerCharacterDragEnd = dragData => ({
	type: types.ASSETS.PLAYERCHARACTER.DRAG.END,
	dragData
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

export const nonPlayerCharacterDragStart = dragData => ({
	type: types.ASSETS.NONPLAYERCHARACTER.DRAG.START,
	dragData
});

export const nonPlayerCharacterDragEnd = dragData => ({
	type: types.ASSETS.NONPLAYERCHARACTER.DRAG.END,
	dragData
});
