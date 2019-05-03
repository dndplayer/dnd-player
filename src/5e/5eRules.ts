import { Character, PlayerCharacter, CharacterSenseType, CharacterSize } from './models/Character';
import CharacterEffects from './CharacterEffects';

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
	public static getProficiencyBonus(character: PlayerCharacter): number {
		if (!character || !character.levels) {
			return null;
		}
		const totalLevel = character.levels.map(x => x.level).reduce((x, y) => x + y);
		if (totalLevel > 20) {
			return null;
		}
		return 1 + Math.ceil(totalLevel / 4);
	}

	public static getSaveModifier(character: PlayerCharacter, ability: string): number {
		if (!character || !character.proficiencies || !character.proficiencies.saves) {
			return null;
		}
		const baseModifier = this.getAbilityModifier(character, ability);
		if (baseModifier === null) {
			return null;
		}
		const proficiencyMultiplier = character.proficiencies.saves[ability] || 0;
		const proficiencyBonus = Rules.getProficiencyBonus(character);
		return baseModifier + Math.floor(proficiencyMultiplier * proficiencyBonus);
	}

	public static getAbilityModifier(character: Character, ability: string): number {
		if (!character || character[ability] === undefined) {
			return null;
		}
		return Math.floor((character[ability] - 10) / 2);
	}

	public static getInitiativeModifier(character: Character): number {
		return this.getAbilityModifier(character, 'dexterity');
	}

	public static getSkillModifier(
		character: PlayerCharacter,
		skill: string,
		ability: string
	): number {
		if (!character || character[ability] === undefined) {
			return null;
		}
		const baseModifier = Math.floor((character[ability] - 10) / 2);
		const proficiencyMultiplier = character.proficiencies.skills[skill] || 0;
		const proficiencyBonus = Rules.getProficiencyBonus(character);
		return baseModifier + Math.floor(proficiencyMultiplier * proficiencyBonus);
	}

	public static getAttacks(character: PlayerCharacter): Attack[] {
		const attacks = []
			.concat((character.equipment || []).map(x => x.attacks || []))
			.concat(character.attacks || [])
			.concat(
				(character.spells || []).map(x => {
					return {
						...x,
						title: x.name
					};
				})
			)
			.flat()
			.map(attack => {
				return {
					name: attack.title,
					range: attack.range,
					effects: attack.effects.map(effect =>
						CharacterEffects.mapCharacterAttackEffect(effect, character)
					)
				};
			});
		return attacks;
	}

	static abilityNameMap = {
		strength: { short: 'STR', long: 'Strength' },
		dexterity: { short: 'DEX', long: 'Dexterity' },
		constitution: { short: 'CON', long: 'Constitution' },
		intelligence: { short: 'INT', long: 'Intelligence' },
		wisdom: { short: 'WIS', long: 'Wisdom' },
		charisma: { short: 'CHA', long: 'Charisma' }
	};

	static skillNameMap = {
		acrobatics: 'Acrobatics',
		animalHandling: 'Animal Handling',
		arcana: 'Arcana',
		athletics: 'Athletics',
		deception: 'Deception',
		history: 'History',
		insight: 'Insight',
		intimidation: 'Intimidation',
		investigation: 'Investigation',
		medicine: 'Medicine',
		nature: 'Nature',
		perception: 'Perception',
		performance: 'Performance',
		persuasion: 'Persuasion',
		religion: 'Religion',
		sleightOfHand: 'Sleight of Hand',
		stealth: 'Stealth',
		survival: 'Survival'
	};

	static saveNameMap = {
		strength: 'Strength Save',
		dexterity: 'Dexterity Save',
		constitution: 'Constitution Save',
		intelligence: 'Intelligence Save',
		wisdom: 'Wisdom Save',
		charisma: 'Charisma Save'
	};

	static senseNameMap = {
		[CharacterSenseType.Tremorsense]: 'tremorsense',
		[CharacterSenseType.Darkvision]: 'darkvision',
		[CharacterSenseType.Blindsight]: 'blindsight',
		[CharacterSenseType.Truesight]: 'truesight',
		[CharacterSenseType.Blind]: 'blind'
	};

	static sizeNameMap = {
		[CharacterSize.Tiny]: 'Tiny',
		[CharacterSize.Small]: 'Small',
		[CharacterSize.Medium]: 'Medium',
		[CharacterSize.Large]: 'Large',
		[CharacterSize.Huge]: 'Huge',
		[CharacterSize.Gargantuan]: 'Gargantuan'
	};

	static speedNameMap = {
		walk: '',
		fly: 'fly',
		burrow: 'burrow',
		swim: 'swim',
		climb: 'climb'
	};

	public static getShortAbilityName(ability: string): string {
		const result = Rules.abilityNameMap[ability];
		return result && result.short;
	}

	public static getLongAbilityName(ability: string): string {
		const result = Rules.abilityNameMap[ability];
		return result && result.long;
	}

	public static getLongSkillName(ability: string): string {
		return Rules.skillNameMap[ability];
	}

	public static getSaveName(ability: string): string {
		return Rules.saveNameMap[ability];
	}

	public static getSenseName(senseType: CharacterSenseType): string {
		return Rules.senseNameMap[senseType];
	}

	public static getSizeName(size: number): string {
		return Rules.sizeNameMap[size];
	}

	public static getSpeedName(key: string): string {
		return Rules.speedNameMap[key];
	}
}
