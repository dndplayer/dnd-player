import { types } from '../actions/characters';

const initialState = {
	openCharacterSheets: [],
	characters: [
		{
			id: '1',
			name: 'Garrick Crownguard',
			size: 'M',
			strength: 25,
			dexterity: 12,
			constitution: 18,
			intelligence: 9,
			wisdom: 12,
			charisma: 12,
			ac: 19,
			hp: 41,
			maxHp: 87,
			hitDice: 8,
			speed: {
				walk: 30,
				climb: 0,
				fly: 0
			},
			proficiencies: {
				saves: {
					strength: 1,
					constitution: 1
				},
				skills: {
					athletics: 2,
					insight: 1,
					intimidation: 1,
					perception: 1
				}
			},
			levels: [
				{
					className: 'Fighter',
					level: 8
				}
			]
		}
	]
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
