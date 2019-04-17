export interface Character {
	name: string;
	size: string;
	str: number;
	dex: number;
	con: number;
	int: number;
	wis: number;
	cha: number;
	proficiencyBonus: number;
	proficiencies: CharacterProficiencies;
}

export interface CharacterProficiencies {
	saves: CharacterProficiencySaves;
	skills: CharacterProficiencySkills;
}

export interface CharacterProficiencySaves {
	str?: number;
	dex?: number;
	con?: number;
	int?: number;
	wis?: number;
	cha?: number;
}

export interface CharacterProficiencySkills {
	Acrobatics?: number;
	'Animal Handling'?: number;
	Arcana?: number;
	Athletics?: number;
	Deception?: number;
	History?: number;
	Insight?: number;
	Intimidation?: number;
	Investigation?: number;
	Medicine?: number;
	Nature?: number;
	Perception?: number;
	Performance?: number;
	Persuasion?: number;
	Religion?: number;
	'Sleight of Hand'?: number;
	Stealth?: number;
	Survival?: number;
}
