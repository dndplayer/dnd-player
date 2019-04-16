export interface ChatMessage {
	sender: string;
	id: string;
	data?: ChatMessageData;
	msg?: string;
}

export interface ChatMessageData {
	type: string;
}

export interface RollData extends ChatMessageData {
	rollType: string;
	rollName: string;
	modifier: string;
	roll1Total: number;
	roll1Details: string;
	rollAdvantageType?: number; // -1 = disadvantage; 0 = normal; +1 = advantage
	roll2Total?: number;
	roll2Details?: string;
}
