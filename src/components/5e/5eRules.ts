import { Character } from './Character';

export interface Attack {
	name: string;
	toHit: number;
	type?: string;
	ranged?: boolean;
	diceCount?: number;
	diceType?: number;
	damageBonus?: number;
	damageType?: string;
	saveType?: string;
	fixedSaveDC?: number;
	range?: number;
	longRange?: number;
	AoEType?: string;
	AoESize?: number;
	activationType?: string;
	activationTime?: number;
	affectedByMartialArts?: boolean;
	proficient?: boolean;
	dualWield?: boolean;
	silvered?: boolean;
	critRange?: number;
}

export default class Rules {
	public static getProficiencyBonus(character: Character): number {
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

	public static getAttacks(character: Character): Attack[] {
		const attacks = [];
		attacks.push({
			name: 'Longsword',
			range: 5,
			diceCount: 1,
			diceType: 8,
			damageBonus: this.getAbilityModifier(character, 'strength'),
			damageType: 'slashing',
			critRange: 20,
			proficient: true,
			toHit:
				this.getAbilityModifier(character, 'strength') + this.getProficiencyBonus(character)
		});
		attacks.push({
			name: 'Light Crossbow',
			range: 80,
			longRange: 320,
			damageBonus: this.getAbilityModifier(character, 'dexterity'),
			diceCount: 1,
			diceType: 8,
			damageType: 'piercing',
			critRange: 20,
			proficient: true,
			toHit:
				this.getAbilityModifier(character, 'dexterity') +
				this.getProficiencyBonus(character)
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
