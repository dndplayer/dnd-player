import { InitiativeRoller, InitiativeData } from '../../models/Initiative';

/**
 * Given a collection of initiative rolls, sort them into the
 * correct order based on the indicated current turn.
 *
 * @param initiatives An array of initiatives to be sorted.
 * @returns A sorted array of InitiativeRoller
 */
export const orderInitiatives = (initiatives: InitiativeData): InitiativeRoller[] => {
	if (!initiatives || !initiatives.rolls) {
		return [];
	}

	const inits = { ...initiatives.rolls };
	const initArray = Object.keys(inits).map(x => ({ ...inits[x], id: x }));

	initArray.sort((a, b): number => b.initiativeRoll - a.initiativeRoll);

	const currTurnIdx = initArray.findIndex((x): boolean => x.id === initiatives.currentTurn);

	const a = initArray.splice(0, currTurnIdx);
	if (a && a.length > 0) {
		initArray.splice(initArray.length, 0, ...a);
	}

	return initArray;
};
