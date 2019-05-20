import { Character } from '../5e/models/Character';

export interface InitiativeRoller {
	character: Character;
	initiativeRoll: number;
	currentTurn: boolean;
}
