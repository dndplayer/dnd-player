import { AttackEffectType } from './5eRules';

export interface Character {
	id: string;
	name: string;
	size: string;
	strength: number;
	dexterity: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;
	ac: number;
	hp: number;
	maxHp: number;
	hitDice: number;
	speed: CharacterSpeeds;
	proficiencies: CharacterProficiencies;
	levels: CharacterLevel[];
	equipment: CharacterEquipment[];
	attacks: CharacterAttack[];
	spells: CharacterSpell[];
}

export interface CharacterSpeeds {
	walk: number;
	burrow?: number;
	climb?: number;
	fly?: number;
	swim?: number;
}
export interface CharacterProficiencies {
	saves: CharacterProficiencySaves;
	skills: CharacterProficiencySkills;
}

export interface CharacterProficiencySaves {
	strength?: number;
	dexterity?: number;
	constitution?: number;
	intelligence?: number;
	wisdom?: number;
	charisma?: number;
}

export interface CharacterProficiencySkills {
	acrobatics?: number;
	animalHandling?: number;
	arcana?: number;
	athletics?: number;
	deception?: number;
	history?: number;
	insight?: number;
	intimidation?: number;
	investigation?: number;
	medicine?: number;
	nature?: number;
	perception?: number;
	performance?: number;
	persuasion?: number;
	religion?: number;
	sleightOfHand?: number;
	stealth?: number;
	survival?: number;
}

export interface CharacterLevel {
	className: string;
	level: number;
}

export interface CharacterEquipment {
	name: string;
	type: string;
	attacks?: CharacterAttack[];
}

export interface CharacterAttack {
	title: string;
	range: number;
	longRange?: number;
	effects: CharacterAttackEffect[];
}

export interface CharacterAttackEffect {
	type: AttackEffectType;
}

export interface ToHitCharacterAttackEffect extends CharacterAttackEffect {
	ability: string;
}

export interface DamageCharacterAttackEffect extends CharacterAttackEffect {
	ability?: string;
	diceCount: number;
	diceSize: number;
	damageType: string;
	bonus?: number;
}

export interface SavingThrowCharacterAttackEffect extends CharacterAttackEffect {
	saveType: string;
	DCAbility: string;
	onSave: CharacterAttackEffect;
	onFail: CharacterAttackEffect;
}

export interface TextCharacterAttackEffect extends CharacterAttackEffect {
	text: string;
}

export interface CharacterSpell {
	name: string;
	level: number;
	school: string;
	time: string;
	range: number;
	verbal?: boolean;
	somatic?: boolean;
	material?: string;
	duration: string;
	description: string;
	higherLevels?: string;
	effects: CharacterAttackEffect[];
}
