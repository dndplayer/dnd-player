export const types = {
	CHARACTERS: {
		OPEN_SHEET: 'CHARACTERS.OPEN_SHEET',
		CLOSE_SHEET: 'CHARACTERS.CLOSE_SHEET'
	}
};

export const openCharacterSheet = (characterId: string) => ({
	type: types.CHARACTERS.OPEN_SHEET,
	characterId
});

export const closeCharacterSheet = (characterId: string) => ({
	type: types.CHARACTERS.CLOSE_SHEET,
	characterId
});
