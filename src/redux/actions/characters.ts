export const types = {
	CHARACTERS: {
		EDIT_SHEET: 'CHARACTERS.EDIT_SHEET',
		ABORT_EDIT_SHEET: 'CHARACTERS.ABORT_EDIT_SHEET'
	}
};

export const editCharacterSheet = (characterId: string) => ({
	type: types.CHARACTERS.EDIT_SHEET,
	characterId
});

export const abortEditCharacterSheet = (characterId: string) => ({
	type: types.CHARACTERS.ABORT_EDIT_SHEET,
	characterId
});
