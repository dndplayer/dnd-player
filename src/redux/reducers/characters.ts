import { types } from '../actions/characters';

const initialState: {
	editingCharacterSheets: string[];
} = {
	editingCharacterSheets: []
};

export default function reducer(state = initialState, action: any = {}) {
	switch (action.type) {
		case types.CHARACTERS.EDIT_SHEET:
			return {
				...state,
				editingCharacterSheets: [
					...state.editingCharacterSheets.filter(x => x !== action.characterId),
					action.characterId
				]
			};
		case types.CHARACTERS.ABORT_EDIT_SHEET:
			return {
				...state,
				editingCharacterSheets: [
					...state.editingCharacterSheets.filter(x => x !== action.characterId)
				]
			};
		default:
			return state;
	}
}
