import { InitiativeRoller, InitiativeData } from '../../models/Initiative';
import { PlayerCharacter, NonPlayerCharacter } from '../../5e/models/Character';

/**
 * Given a collection of initiative rolls, sort them into the
 * correct order based on the indicated current turn.
 *
 * @param initiatives An array of initiatives to be sorted.
 * @param pc An array of PlayerCharacters so ties can be solved using Character dexterity
 * @param npc An array of NonPlayerCharacters so ties can be solved using Character dexterity
 * @returns A sorted array of InitiativeRoller
 */
export const orderInitiatives = (
	initiatives: InitiativeData,
	pc: PlayerCharacter[],
	npc: NonPlayerCharacter[],
	fixedOrder: boolean = false
): InitiativeRoller[] => {
	if (!initiatives || !initiatives.rolls) {
		return [];
	}

	if (!pc || !npc) {
		return [];
	}

	const inits = { ...initiatives.rolls };
	const initArray = Object.keys(inits).map(x => ({ ...inits[x], id: x }));

	initArray.sort(
		(a, b): number => {
			const aChar = a.pcId
				? pc.find(x => x.id === a.pcId)
				: a.npcTokenId
				? npc.find(x => x.id === a.npcTokenId)
				: null;
			const bChar = b.pcId
				? pc.find(x => x.id === b.pcId)
				: b.npcTokenId
				? npc.find(x => x.id === b.npcTokenId)
				: null;

			// console.log(aChar);
			// console.log(bChar);

			if (!aChar || !bChar) {
				// We cannot use Dex to compare these so rely on a simple sort
				// console.log(
				// 	`Cannot sort initiatives using dex tie-breaker as a or b don't have a char`
				// );
				return b.initiativeRoll - a.initiativeRoll;
			}

			// console.log(
			// 	`${b.initiativeRoll} + 0.1 * ${bChar.dexterity} - (${a.initiativeRoll} + 0.1 * ${
			// 		aChar.dexterity
			// 	})`
			// );

			return (
				b.initiativeRoll +
				0.1 * bChar.dexterity -
				(a.initiativeRoll + 0.1 * aChar.dexterity)
			);
		}
	);

	if (fixedOrder) {
		return initArray;
	}

	const currTurnIdx = initArray.findIndex((x): boolean => x.id === initiatives.currentTurn);

	const a = initArray.splice(0, currTurnIdx);
	if (a && a.length > 0) {
		initArray.splice(initArray.length, 0, ...a);
	}

	return initArray;
};
