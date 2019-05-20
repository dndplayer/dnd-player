/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import each from 'jest-each';
import { orderInitiatives } from './InitiativeHelpers';
import { InitiativeRoller } from '../../models/Initiative';

describe('InitiativeHelpers', () => {
	describe('orderInitiatives', () => {
		it('should return an empty array if an empty array is given', () => {
			const i = [];
			const x = orderInitiatives(i);
			expect(x).toEqual([]);
		});
		it('should return an array with current turn first', () => {
			const i = [generateInitiative(), generateInitiative(), generateInitiative(true)];
			const x = orderInitiatives(i);
			expect(x[0].currentTurn).toBeTruthy();
			expect(x[1].currentTurn).toBeFalsy();
			expect(x[2].currentTurn).toBeFalsy();
		});
		it('should return a correctly sorted array', () => {
			const i = [
				generateInitiative(undefined, 12),
				generateInitiative(undefined, 5),
				generateInitiative(true, 9),
				generateInitiative(undefined, 19),
				generateInitiative(undefined, 2)
			];
			const x = orderInitiatives(i);

			const y = x.map(z => z.initiativeRoll);
			expect(y).toEqual([9, 12, 19, 2, 5]);

			// --- The below is a dynamic way to check the above.
			// const maxRoll = x.reduce((p, c) => (c.initiativeRoll > p ? c.initiativeRoll : p), 0);

			// let last = x[0].initiativeRoll;
			// for (let j = 1; j < x.length; j++) {
			// 	const y = x[j];

			// 	if (y.initiativeRoll < last && last === maxRoll) {
			// 		last = 0;
			// 	}

			// 	expect(y.initiativeRoll).toBeGreaterThanOrEqual(last);
			// 	last = y.initiativeRoll;
			// }
		});
		it('should return a correctly sorted array (if current turn is at start)', () => {
			const i = [
				generateInitiative(true, 12),
				generateInitiative(undefined, 5),
				generateInitiative(undefined, 9),
				generateInitiative(undefined, 19),
				generateInitiative(undefined, 2)
			];
			const x = orderInitiatives(i);

			const y = x.map(z => z.initiativeRoll);
			expect(y).toEqual([12, 19, 2, 5, 9]);
		});
		it('should return a correctly sorted array (if current turn is at end)', () => {
			const i = [
				generateInitiative(undefined, 12),
				generateInitiative(undefined, 5),
				generateInitiative(undefined, 9),
				generateInitiative(undefined, 19),
				generateInitiative(true, 2)
			];
			const x = orderInitiatives(i);

			const y = x.map(z => z.initiativeRoll);
			expect(y).toEqual([2, 5, 9, 12, 19]);
		});
	});
});

function generateInitiative(currTurn?: boolean, roll?: number): InitiativeRoller {
	return {
		currentTurn: currTurn || false,
		initiativeRoll: roll || Math.ceil(Math.random() * 20),
		character: null
	};
}
