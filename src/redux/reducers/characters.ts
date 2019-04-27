import { types } from '../actions/characters';
import {
	Character,
	ToHitCharacterAttackEffect,
	DamageCharacterAttackEffect,
	TextCharacterAttackEffect,
	SavingThrowCharacterAttackEffect
} from '../../components/5e/Character';
import { AttackEffectType } from '../../components/5e/5eRules';

const initialState: {
	openCharacterSheets: string[];
} = {
	openCharacterSheets: []
	/*characters: [
	]*/
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
