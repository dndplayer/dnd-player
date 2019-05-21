/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import each from 'jest-each';
import { orderInitiatives } from './InitiativeHelpers';
import { InitiativeRoller } from '../../models/Initiative';

describe('InitiativeHelpers', () => {
	describe('orderInitiatives', () => {
		it('should return an empty array if null or undefined is given', () => {
			const x = orderInitiatives(null);
			expect(x).toEqual([]);
		});
		it('should return an empty array if an empty array is given', () => {
			const i = {};
			const x = orderInitiatives(i);
			expect(x).toEqual([]);
		});
		it('should return an array with current turn first', () => {
			const i = {
				currentTurn: '111',
				rolls: {
					'111': generateInitiative(),
					'222': generateInitiative(),
					'333': generateInitiative()
				}
			};
			const x = orderInitiatives(i);
			expect(x[0].id).toEqual('111');
		});
		it('should return a correctly sorted array', () => {
			const i = {
				currentTurn: '333',
				rolls: {
					'111': generateInitiative(12),
					'222': generateInitiative(5),
					'333': generateInitiative(9),
					'444': generateInitiative(19),
					'555': generateInitiative(2)
				}
			};
			const x = orderInitiatives(i);

			const y = x.map(z => z.initiativeRoll);
			expect(y).toEqual([9, 5, 2, 19, 12]);

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
			const i = {
				currentTurn: '111',
				rolls: {
					'111': generateInitiative(12),
					'222': generateInitiative(5),
					'333': generateInitiative(9),
					'444': generateInitiative(19),
					'555': generateInitiative(2)
				}
			};
			const x = orderInitiatives(i);

			const y = x.map(z => z.initiativeRoll);
			expect(y).toEqual([12, 9, 5, 2, 19]);
		});
		it('should return a correctly sorted array (if current turn is at end)', () => {
			const i = {
				currentTurn: '555',
				rolls: {
					'111': generateInitiative(12),
					'222': generateInitiative(5),
					'333': generateInitiative(9),
					'444': generateInitiative(19),
					'555': generateInitiative(2)
				}
			};
			const x = orderInitiatives(i);

			const y = x.map(z => z.initiativeRoll);
			expect(y).toEqual([2, 19, 12, 9, 5]);
		});
	});
});

function generateInitiative(roll?: number): InitiativeRoller {
	return {
		initiativeRoll: roll || Math.ceil(Math.random() * 20),
		npcId: null,
		pcId: null
	};
}
