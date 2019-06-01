import { AttackEffectType, Attack } from '../5eRules';

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
	alignment: string;
}

export interface PlayerCharacter extends Character {
	race: string;
	ac: number;
	hp: number;
	maxHp: number;
	hitDice: number;
	levels: CharacterLevel[];
	equipment: CharacterEquipment[];
	attacks: CharacterAttack[];
	spells: CharacterSpellReference[];
	saves: CharacterProficiencySaves;
	skills: CharacterProficiencySkills;
	traits: CharacterTrait[];
	resources: CharacterResource[];
	spellSlots: CharacterSpellSlots;
	money: CharacterMoney;
}

export interface NonPlayerCharacter extends Character {
	class: string;
	environments: string[];
	source: string;
	cr: number;
	ac: number;
	acType: string;
	hp?: number;
	maxHp?: number;
	hpDice: string;
	actions: Attack[];
	reactions: Attack[];
	legendaryActions: Attack[];
	legendaryActionCount?: number;
	languages: string;
	saves: NonPlayerCharacterSaves;
	damageResistances: string;
	damageImmunities: string;
	conditionImmunities: string;
	traits: NonPlayerCharacterTrait[];
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
export interface CharacterSpellReference {
	spellId: string;
	prepared: boolean;
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

export interface CharacterSpellSlots {
	1?: CharacterSpellSlot;
	2?: CharacterSpellSlot;
	3?: CharacterSpellSlot;
	4?: CharacterSpellSlot;
	5?: CharacterSpellSlot;
	6?: CharacterSpellSlot;
	7?: CharacterSpellSlot;
	8?: CharacterSpellSlot;
	9?: CharacterSpellSlot;
}
export interface CharacterSpellSlot {
	current: number;
	max: number;
}
export interface CharacterResource {
	name: string;
	quantity: number;
	max: number;
}
export interface CharacterTrait {
	name: string;
	description: string;
}

export interface CharacterLevel {
	className: string;
	level: number;
}

export interface CharacterMoney {
	cp: number;
	sp: number;
	ep: number;
	gp: number;
	pp: number;
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
	bonus: number;
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
	id: string;
	name: string;
	classes: string[];
	level: number;
	school: string;
	time: string;
	range: CharacterSpellRange;
	verbal?: boolean;
	somatic?: boolean;
	material?: string;
	concentration: boolean;
	ritual: boolean;
	duration: string;
	description: string;
	effects: CharacterAttackEffect[];
	effectsHigherLevel?: CharacterAttackEffect[];
	source: string;
}

export interface CharacterSpellRange {
	distance: number;
	type: string;
}

export interface NonPlayerCharacterTrait {
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
