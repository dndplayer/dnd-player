import {
	Character,
	DamageCharacterAttackEffect,
	ToHitCharacterAttackEffect,
	CharacterAttackEffect,
	SavingThrowCharacterAttackEffect,
	TextCharacterAttackEffect
} from './Character';

export interface Attack {
	name: string;
	range: number;
	longRange?: number;
	effects: AttackEffect[];
}

export interface AttackEffect {
	type: AttackEffectType;
}

export enum AttackEffectType {
	ToHit,
	Damage,
	SavingThrow,
	Text
}

export interface ToHitAttackEffect extends AttackEffect {
	modifier: number;
	critRange?: number;
}

export interface DamageAttackEffect extends AttackEffect {
	damageType: string;
	diceCount: number;
	diceSize: number;
	bonus?: number;
}

export interface SavingThrowAttackEffect extends AttackEffect {
	saveType: string;
	saveDC: number;
	onSave: AttackEffect;
	onFail: AttackEffect;
}

export interface TextAttackEffect extends AttackEffect {
	text: string;
}

export default class Rules {
	public static getProficiencyBonus(character: Character): number {
		if (!character || !character.levels) {
			return 0;
		}
		const totalLevel = character.levels.map(x => x.level).reduce((x, y) => x + y);
		return 1 + Math.ceil(totalLevel / 4);
	}

	public static getSaveModifier(character: Character, ability: string): number {
		const baseModifier = this.getAbilityModifier(character, ability);
		const proficiencyMultiplier = character.proficiencies.saves[ability] || 0;
		const proficiencyBonus = Rules.getProficiencyBonus(character);
		return baseModifier + Math.floor(proficiencyMultiplier * proficiencyBonus);
	}

	public static getAbilityModifier(character: Character, ability: string): number {
		return Math.floor((character[ability] - 10) / 2);
	}

	public static getInitiativeModifier(character: Character): number {
		return this.getAbilityModifier(character, 'dexterity');
	}

	public static mapCharacterAttackEffect(
		effect: CharacterAttackEffect,
		character: Character
	): AttackEffect {
		switch (effect.type) {
			case AttackEffectType.ToHit: {
				const toHitEffect = effect as ToHitCharacterAttackEffect;
				return {
					type: AttackEffectType.ToHit,
					modifier:
						this.getAbilityModifier(character, toHitEffect.ability) +
						this.getProficiencyBonus(character),
					critRange: 20
				} as ToHitAttackEffect;
			}
			case AttackEffectType.Damage: {
				const damageEffect = effect as DamageCharacterAttackEffect;
				return {
					type: AttackEffectType.Damage,
					damageType: damageEffect.damageType,
					diceCount: damageEffect.diceCount,
					diceSize: damageEffect.diceSize,
					bonus: damageEffect.ability
						? this.getAbilityModifier(character, damageEffect.ability)
						: 0
				} as DamageAttackEffect;
			}
			case AttackEffectType.SavingThrow: {
				const saveEffect = effect as SavingThrowCharacterAttackEffect;
				return {
					type: AttackEffectType.SavingThrow,
					saveType: saveEffect.saveType,
					saveDC: 10 + this.getAbilityModifier(character, saveEffect.DCAbility),
					onSave: this.mapCharacterAttackEffect(saveEffect.onSave, character),
					onFail: this.mapCharacterAttackEffect(saveEffect.onFail, character)
				} as SavingThrowAttackEffect;
			}
			case AttackEffectType.Text: {
				const textEffect = effect as TextCharacterAttackEffect;
				return {
					type: AttackEffectType.Text,
					text: textEffect.text
				} as TextAttackEffect;
			}
			default:
				throw new Error(`Unhandled attack effect type ${effect.type}.`);
		}
	}

	public static getAttacks(character: Character): Attack[] {
		const attacks = []
			.concat(character.equipment.map(x => x.attacks || []))
			.concat(character.attacks)
			.flat()
			.map(attack => {
				return {
					name: attack.title,
					range: attack.range,
					effects: attack.effects.map(effect =>
						this.mapCharacterAttackEffect(effect, character)
					)
				};
			});
		return attacks;
	}

	public static getShortAbilityName(ability: string): string {
		switch (ability) {
			case 'strength':
				return 'STR';
			case 'dexterity':
				return 'DEX';
			case 'constitution':
				return 'CON';
			case 'intelligence':
				return 'INT';
			case 'wisdom':
				return 'WIS';
			case 'charisma':
				return 'CHA';
			default:
				return '';
		}
	}

	public static getLongAbilityName(ability: string): string {
		switch (ability) {
			case 'strength':
				return 'Strength';
			case 'dexterity':
				return 'Dexterity';
			case 'constitution':
				return 'Consititution';
			case 'intelligence':
				return 'Intelligence';
			case 'wisdom':
				return 'Wisdom';
			case 'charisma':
				return 'Charisma';
			default:
				return '';
		}
	}

	public static getLongSkillName(ability: string): string {
		switch (ability) {
			case 'acrobatics':
				return 'Acrobatics';
			case 'animalHandling':
				return 'Animal Handling';
			case 'arcana':
				return 'Arcana';
			case 'athletics':
				return 'Athletics';
			case 'deception':
				return 'Deception';
			case 'history':
				return 'History';
			case 'insight':
				return 'Insight';
			case 'intimidation':
				return 'Intimidation';
			case 'investigation':
				return 'Investigation';
			case 'medicine':
				return 'Medicine';
			case 'nature':
				return 'Nature';
			case 'perception':
				return 'Perception';
			case 'performance':
				return 'Performance';
			case 'persuasion':
				return 'Persuasion';
			case 'religion':
				return 'Religion';
			case 'sleightOfHand':
				return 'Sleight of Hand';
			case 'stealth':
				return 'Stealth';
			case 'survival':
				return 'Survival';
			default:
				return '';
		}
	}
}
