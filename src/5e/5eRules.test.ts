/* eslint-disable @typescript-eslint/indent */
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
} from './models/Character';
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

		it('should return null for invalid characters', () => {
			expect(Rules.getProficiencyBonus({})).toBe(null);
		});
		it('should return null if character is null', () => {
			expect(Rules.getProficiencyBonus(null)).toBe(null);
		});
		it('should return null if level is greater than 20', () => {
			const character = getMockCharacter();
			character.levels = [{ className: 'fighter', level: 21 }];
			expect(Rules.getProficiencyBonus(character)).toBe(null);
		});
	});

	describe('getSaveModifier', () => {
		it('should return null if the character is invalid', () => {
			expect(Rules.getSaveModifier({}, 'strength')).toBe(null);
			expect(Rules.getSaveModifier({ proficiencies: {} }, 'strength')).toBe(null);
		});
		it('should return null if the attribute is invalid', () => {
			const char = getMockCharacter();
			expect(Rules.getSaveModifier(char, 'invalid')).toBe(null);
		});
		it("should be the ability score if the character isn't proficient", () => {
			const char = getMockCharacter();
			char.strength = 12;
			char.levels = [{ className: 'fighter', level: 5 }, { className: 'wizard', level: 4 }];
			char.proficiencies.saves = {};
			expect(Rules.getSaveModifier(char, 'strength')).toBe(1);
		});
		it('should be the ability score plus proficiency bonus if the character is proficient', () => {
			const char = getMockCharacter();
			char.strength = 12;
			char.levels = [{ className: 'fighter', level: 5 }, { className: 'wizard', level: 4 }];
			char.proficiencies.saves = { strength: 1 };
			expect(Rules.getSaveModifier(char, 'strength')).toBe(5);
		});
		it('should be the ability score plus double proficiency bonus if the character has expertise', () => {
			const char = getMockCharacter();
			char.strength = 12;
			char.levels = [{ className: 'fighter', level: 5 }, { className: 'wizard', level: 4 }];
			char.proficiencies.saves = { strength: 2 };
			expect(Rules.getSaveModifier(char, 'strength')).toBe(9);
		});
	});

	describe('getAbilityModifier', () => {
		each`
			score | expected
			${6}  | ${-2}
			${7}  | ${-2}
			${8}  | ${-1}
			${10} | ${0}
			${20} | ${5}
			${25} | ${7}
		`.it('should return $expected for an ability score of $score', ({ score, expected }) => {
			const char = getMockCharacter();
			char.strength = score;
			expect(Rules.getAbilityModifier(char, 'strength')).toBe(expected);
		});

		it('should return the matching ability score', () => {
			const char = getMockCharacter();
			char.strength = 8;
			char.dexterity = 9;
			char.constitution = 10;
			char.intelligence = 11;
			char.wisdom = 12;
			char.charisma = 13;
			expect(Rules.getAbilityModifier(char, 'strength')).toBe(-1);
			expect(Rules.getAbilityModifier(char, 'dexterity')).toBe(-1);
			expect(Rules.getAbilityModifier(char, 'constitution')).toBe(0);
			expect(Rules.getAbilityModifier(char, 'intelligence')).toBe(0);
			expect(Rules.getAbilityModifier(char, 'wisdom')).toBe(1);
			expect(Rules.getAbilityModifier(char, 'charisma')).toBe(1);
		});
	});

	describe('getInitiativeModifier', () => {
		each`
			dex   | expected
			${8}  | ${-1}
			${10} | ${0}
			${11} | ${0}
			${12} | ${1}
			${20} | ${5}
		`.it('should be $expected when a character has a dex score of $dex', ({ dex, expected }) => {
			const char = getMockCharacter();
			char.dexterity = dex;
			expect(Rules.getInitiativeModifier(char)).toBe(expected);
		});
	});

	describe('getSkillModifier', () => {
		it('should be the base ability modifier if not proficient', () => {
			const char = getMockCharacter();
			expect(Rules.getSkillModifier(char, 'deception', 'charisma')).toBe(1);
		});
		it('should be the base ability modifier plus proficiency bonus if proficient', () => {
			const char = getMockCharacter();
			expect(Rules.getSkillModifier(char, 'intimidation', 'charisma')).toBe(4);
		});
		it('should be the base ability modifier plus proficiency bonus if has expertise', () => {
			const char = getMockCharacter();
			expect(Rules.getSkillModifier(char, 'athletics', 'strength')).toBe(13);
		});
	});

	describe('getShortAbilityName', () => {
		each`
			ability            | expected
			${'strength'}      | ${'STR'}
			${'dexterity'}     | ${'DEX'}
			${'constitution'}  | ${'CON'}
			${'intelligence'}  | ${'INT'}
			${'wisdom'}        | ${'WIS'}
			${'charisma'}      | ${'CHA'}
			${'anything else'} | ${undefined}
		`.it('should be $expected when passed $ability', ({ ability, expected }) => {
			expect(Rules.getShortAbilityName(ability)).toStrictEqual(expected);
		});
	});

	describe('getLongAbilityName', () => {
		each`
			ability            | expected
			${'strength'}      | ${'Strength'}
			${'dexterity'}     | ${'Dexterity'}
			${'constitution'}  | ${'Constitution'}
			${'intelligence'}  | ${'Intelligence'}
			${'wisdom'}        | ${'Wisdom'}
			${'charisma'}      | ${'Charisma'}
			${'anything else'} | ${undefined}
		`.it('should be $expected when passed $ability', ({ ability, expected }) => {
			expect(Rules.getLongAbilityName(ability)).toStrictEqual(expected);
		});
	});
	describe('getLongSkillName', () => {
		each`
			ability             | expected
			${'sleightOfHand'}  | ${'Sleight of Hand'}
			${'athletics'}      | ${'Athletics'}
			${'nature'}         | ${'Nature'}
			${'animalHandling'} | ${'Animal Handling'}
			${'anything else'}  | ${undefined}
		`.it('should be $expected when passed $ability', ({ ability, expected }) => {
			expect(Rules.getLongSkillName(ability)).toStrictEqual(expected);
		});
	});
	describe('getSaveName', () => {
		each`
			ability            | expected
			${'strength'}      | ${'Strength Save'}
			${'dexterity'}     | ${'Dexterity Save'}
			${'constitution'}  | ${'Constitution Save'}
			${'intelligence'}  | ${'Intelligence Save'}
			${'wisdom'}        | ${'Wisdom Save'}
			${'charisma'}      | ${'Charisma Save'}
			${'anything else'} | ${undefined}
		`.it('should be $expected when passed $ability', ({ ability, expected }) => {
			expect(Rules.getSaveName(ability)).toStrictEqual(expected);
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
		],
		spells: []
	};
}
