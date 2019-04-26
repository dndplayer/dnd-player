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
			],
			attacks: [
				{
					title: 'Goading Strike',
					range: 5,
					effects: [
						{
							type: AttackEffectType.Damage,
							diceCount: 1,
							diceSize: 8,
							damageType: 'additional'
						} as DamageCharacterAttackEffect,
						{
							type: AttackEffectType.SavingThrow,
							saveType: 'wisdom',
							DCAbility: 'strength',
							onSave: {
								type: AttackEffectType.Text,
								text: 'No effect'
							} as TextCharacterAttackEffect,
							onFail: {
								type: AttackEffectType.Text,
								text:
									'The target has a disadvantage on all attack rolls against targets other than you until the end of your next turn.'
							} as TextCharacterAttackEffect
						} as SavingThrowCharacterAttackEffect
					]
				}
			],
			equipment: [
				{
					name: 'Longsword',
					type: 'martialWeapon',
					attacks: [
						{
							title: 'One-handed Swing',
							range: 5,
							effects: [
								{
									type: AttackEffectType.ToHit,
									ability: 'strength'
								} as ToHitCharacterAttackEffect,
								{
									type: AttackEffectType.Damage,
									diceCount: 1,
									diceSize: 8,
									ability: 'strength',
									damageType: 'slashing'
								} as DamageCharacterAttackEffect
							]
						},
						{
							title: 'Two-handed Swing',
							range: 5,
							effects: [
								{
									type: AttackEffectType.ToHit,
									ability: 'strength'
								} as ToHitCharacterAttackEffect,
								{
									type: AttackEffectType.Damage,
									diceCount: 1,
									diceSize: 10,
									ability: 'strength',
									damageType: 'slashing'
								} as DamageCharacterAttackEffect
							]
						}
					]
				},
				{
					name: 'Light Crossbow',
					type: 'martialWeapon',
					attacks: [
						{
							title: 'Shoot Bolt',
							range: 80,
							longRange: 320,
							effects: [
								{
									type: AttackEffectType.ToHit,
									ability: 'dexterity'
								} as ToHitCharacterAttackEffect,
								{
									type: AttackEffectType.Damage,
									diceCount: 1,
									diceSize: 8,
									ability: 'dexterity',
									damageType: 'piercing'
								} as DamageCharacterAttackEffect
							]
						}
					]
				}
			]
		}
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
