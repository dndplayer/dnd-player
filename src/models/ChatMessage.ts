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
	damageRollTotal?: number;
	damageRollDetails?: number;
	damageRollSuffix?: string;
}
