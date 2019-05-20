import { InitiativeRoller } from '../../models/Initiative';

/**
 * Given a collection of initiative rolls, sort them into the
 * correct order based on the indicated current turn.
 *
 * @param initiatives An array of initiatives to be sorted.
 * @returns A sorted array of InitiativeRoller
 */
export const orderInitiatives = (initiatives: InitiativeRoller[]): InitiativeRoller[] => {
	const inits = [...initiatives];
	inits.sort((a, b): number => a.initiativeRoll - b.initiativeRoll);

	const currTurnIdx = inits.findIndex((x): boolean => x.currentTurn);

	const a = inits.splice(0, currTurnIdx);
	if (a && a.length > 0) {
		inits.splice(inits.length, 0, ...a);
	}

	return inits;
};
