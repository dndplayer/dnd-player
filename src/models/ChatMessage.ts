export interface ChatMessage {
	sender: string;
	id: string;
	data?: ChatMessageData;
	msg?: string;
}

export interface ChatMessageData {
	type: string;
}

export interface CharacterActionData extends ChatMessageData {
	title: string;
	characterName: string;
	results: CharacterActionResult[];
}

export enum CharacterActionResultType {
	Text,
	DiceRoll,
	Condition
}

export interface CharacterActionResult {
	type: CharacterActionResultType;
}

export interface CharacterActionTextResult extends CharacterActionResult {
	text: string;
}

export interface CharacterActionDiceRollResult extends CharacterActionResult {
	rolls: CharacterActionDiceRollResultRoll[];
	advantage: AdvantageType;
	modifier: number;
}

export interface CharacterActionConditionResult extends CharacterActionResult {
	condition: string;
	onSuccess: CharacterActionResult;
	onFailure: CharacterActionResult;
}

export enum AdvantageType {
	Disadvantage = -1,
	None = 0,
	Advantage = 1
}

export interface CharacterActionDiceRollResultRoll {
	total: number;
	details: string;
	critSuccess: boolean;
	critFail: boolean;
	ignore: boolean;
	suffix: string;
}

export interface RollData extends ChatMessageData {
	characterName?: string;
	rollType: string;
	rollName: string;
	rollSuffix?: string;
	modifier: string;
	roll1Total: number;
	roll1Details: string;
	roll1CritSuccess: boolean;
	roll1CritFail: boolean;
	rollAdvantageType?: number; // -1 = disadvantage; 0 = normal; +1 = advantage
	roll2Total?: number;
	roll2Details?: string;
	roll2CritSuccess?: boolean;
	roll2CritFail?: boolean;
}
