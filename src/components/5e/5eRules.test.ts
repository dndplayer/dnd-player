/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Rules, { AttackEffectType } from './5eRules';
import {
	Character,
	DamageCharacterAttackEffect,
	TextCharacterAttackEffect,
	SavingThrowCharacterAttackEffect,
	ToHitCharacterAttackEffect
} from './Character';
import each from 'jest-each';

describe('Rules', () => {
	describe('getProficiencyBonus', () => {
		each`
			level | expected
			${1}  | ${2}
			${4}  | ${2}
			${5}  | ${3}
			${8}  | ${3}
			${9}  | ${4}
			${12} | ${4}
			${13} | ${5}
			${16} | ${5}
			${17} | ${6}
			${20} | ${6}
		`.it('should be $expected at level $level', ({ level, expected }) => {
			const character = getMockCharacter();
			character.levels = [{ className: 'fighter', level: level }];
			expect(Rules.getProficiencyBonus(character)).toBe(expected);
		});

		it('should be calculated from the sum of the total class levels', () => {
			const character = getMockCharacter();
			character.levels = [
				{ className: 'fighter', level: 4 },
				{ className: 'wizard', level: 3 },
				{ className: 'rogue', level: 3 }
			];
			expect(Rules.getProficiencyBonus(character)).toBe(4);
		});

		it('should return 0 for invalid characters', () => {
			expect(Rules.getProficiencyBonus({})).toBe(0);
		});
		it('should return 0 if character is null', () => {
			expect(Rules.getProficiencyBonus(null)).toBe(0);
		});
		it('should return 0 if level is greater than 20', () => {
			const character = getMockCharacter();
			character.levels = [{ className: 'fighter', level: 21 }];
			expect(Rules.getProficiencyBonus(character)).toBe(0);
		});
	});
});

function getMockCharacter(): Character {
	return {
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
	};
}
