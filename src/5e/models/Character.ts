import { AttackEffectType } from '../5eRules';
import { PlayerCharacterData, NonPlayerCharacterData } from '../../models/Asset';

export interface Character {
	id: string;
	name: string;
	imageRef: string;
	size: CharacterSize;
	strength: number;
	dexterity: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;
	speed: CharacterSpeeds;
}

export interface PlayerCharacter extends PlayerCharacterData, Character {
	ac: number;
	hp: number;
	maxHp: number;
	hitDice: number;
	proficiencies: CharacterProficiencies;
	levels: CharacterLevel[];
	equipment: CharacterEquipment[];
	attacks: CharacterAttack[];
	spells: CharacterSpell[];
}

export interface NonPlayerCharacter extends NonPlayerCharacterData, Character {
	class: string;
	alignment: string;
	environments: string[];
	source: string;
	cr: number;
	ac: number;
	acType: string;
	hpDice: string;
	actions: CharacterAttack[];
	languages: string;
	saves: NonPlayerCharacterSaves;
	damageResistances: string;
	damageImmunities: string;
	conditionImmunities: string;
	features: NonPlayerCharacterFeature[];
	senses: CharacterSenses;
	skills: NonPlayerCharacterSkill[];
	variants?: string[];
}

export enum CharacterSize {
	Tiny = 0,
	Small = 1,
	Medium = 2,
	Large = 3,
	Huge = 4,
	Gargantuan = 5
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
	weight?: number;
	quantity?: number;
	attacks?: CharacterAttack[];
	notes?: string;
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

export interface NonPlayerCharacterFeature {
	title: string;
	description: string;
}

export interface CharacterSenses {
	tremorsense?: number;
	blind?: boolean;
	blindsight?: number;
	truesight?: number;
	darkvision?: number;
}

export interface NonPlayerCharacterSkill {
	skill: string;
	modifier: number;
}

export interface NonPlayerCharacterSaves {
	strength?: number;
	dexterity?: number;
	constitution?: number;
	intelligence?: number;
	wisdom?: number;
	charisma?: number;
}
