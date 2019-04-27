import { types } from '../actions/characters';

const initialState: {
	openCharacterSheets: string[];
} = {
	openCharacterSheets: []
};

export default function reducer(state = initialState, action: any = {}) {
	switch (action.type) {
		case types.CHARACTERS.OPEN_SHEET:
			return {
				...state,
				openCharacterSheets: [
					...state.openCharacterSheets.filter(x => x !== action.characterId),
					action.characterId
				]
			};
		case types.CHARACTERS.CLOSE_SHEET:
			return {
				...state,
				openCharacterSheets: state.openCharacterSheets.filter(x => x !== action.characterId)
			};
		default:
			return state;
	}
}
