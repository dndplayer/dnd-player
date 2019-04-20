export interface Character {
	name: string;
	size: string;
	strength: number;
	dexterity: number;
	constitution: number;
	intelligence: number;
	wisdom: number;
	charisma: number;
	speed: CharacterSpeeds;
	proficiencies: CharacterProficiencies;
	levels: CharacterLevel[];
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
