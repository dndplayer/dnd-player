/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import each from 'jest-each';
import { orderInitiatives } from './InitiativeHelpers';
import { InitiativeRoller } from '../../models/Initiative';
import {
	PlayerCharacter,
	NonPlayerCharacter,
	Character,
	CharacterSize
} from '../../5e/models/Character';

describe('InitiativeHelpers', () => {
	describe('orderInitiatives', () => {
		it('should return an empty array if null or undefined is given', () => {
			const x = orderInitiatives(null, [], []);
			expect(x).toEqual([]);
		});
		it('should return an empty array if no playerCharacter or nonPlayerCharacter arrays are given', () => {
			const x = orderInitiatives({}, null, null);
			expect(x).toEqual([]);
		});
		it('should return an empty array if an empty object is given', () => {
			const i = {};
			const pc = generatePlayerCharacters([]);
			const npc = generateNonPlayerCharacters([]);
			const x = orderInitiatives(i, pc, npc);
			expect(x).toEqual([]);
		});
		it('should return an array with current turn first', () => {
			const i = {
				currentTurn: '111',
				rolls: {
					'111': generateInitiative(null, 'aaa'),
					'222': generateInitiative(null, null, 'bbb'),
					'333': generateInitiative(null, 'ccc')
				}
			};
			const pc = generatePlayerCharacters(['aaa', 'ccc']);
			const npc = generateNonPlayerCharacters(['bbb']);
			const x = orderInitiatives(i, pc, npc);
			expect(x[0].id).toEqual('111');
		});
		it('should return a correctly sorted array', () => {
			const i = {
				currentTurn: '333',
				rolls: {
					'111': generateInitiative(12, 'aaa'),
					'222': generateInitiative(5, 'bbb'),
					'333': generateInitiative(9, 'ccc'),
					'444': generateInitiative(19, null, 'ddd'),
					'555': generateInitiative(2, 'eee')
				}
			};
			const pc = generatePlayerCharacters(['aaa', 'bbb', 'ccc', 'eee']);
			const npc = generateNonPlayerCharacters(['ddd']);
			const x = orderInitiatives(i, pc, npc);

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
					'111': generateInitiative(12, 'aaa'),
					'222': generateInitiative(5, null, 'bbb'),
					'333': generateInitiative(9, null, 'ccc'),
					'444': generateInitiative(19, null, 'ddd'),
					'555': generateInitiative(2, 'eee')
				}
			};
			const pc = generatePlayerCharacters(['aaa', 'eee']);
			const npc = generateNonPlayerCharacters(['bbb', 'ccc', 'ddd']);
			const x = orderInitiatives(i, pc, npc);

			const y = x.map(z => z.initiativeRoll);
			expect(y).toEqual([12, 9, 5, 2, 19]);
		});
		it('should return a correctly sorted array (if current turn is at end)', () => {
			const i = {
				currentTurn: '555',
				rolls: {
					'111': generateInitiative(12, 'aaa'),
					'222': generateInitiative(5, 'bbb'),
					'333': generateInitiative(9, 'ccc'),
					'444': generateInitiative(19, 'ddd'),
					'555': generateInitiative(2, 'eee')
				}
			};
			const pc = generatePlayerCharacters(['aaa', 'bbb', 'ccc', 'ddd', 'eee']);
			const npc = generateNonPlayerCharacters([]);
			const x = orderInitiatives(i, pc, npc);

			const y = x.map(z => z.initiativeRoll);
			expect(y).toEqual([2, 19, 12, 9, 5]);
		});
		it('should resolve ties using the dexterity', () => {
			const i = {
				currentTurn: '333',
				rolls: {
					'111': generateInitiative(12, 'aaa'),
					'222': generateInitiative(12, 'bbb'),
					'333': generateInitiative(5, 'ccc')
				}
			};
			const pc = generatePlayerCharacters(['aaa', 'bbb', 'ccc']);
			const npc = generateNonPlayerCharacters([]);

			pc[0].dexterity = 5;
			pc[1].dexterity = 15; // Should win tie

			const x = orderInitiatives(i, pc, npc);

			const y = x.map(z => z.id);
			expect(y).toEqual(['333', '222', '111']);
		});
	});
});

// Generator functions

function generateInitiative(roll?: number, pcId?: string, npcId?: string): InitiativeRoller {
	return {
		initiativeRoll: roll || Math.ceil(Math.random() * 20),
		npcId: npcId || null,
		pcId: pcId || null
	};
}

function generatePlayerCharacters(ids: string[]): PlayerCharacter[] {
	return ids.map(x => generatePlayerCharacter(x));
}

function generateNonPlayerCharacters(ids: string[]): NonPlayerCharacter[] {
	return ids.map(x => generateNonPlayerCharacter(x));
}

function generateNonPlayerCharacter(id: string): NonPlayerCharacter {
	return {
		...generateCharacter(id),
		class: '',
		environments: [],
		source: '',
		cr: 1,
		ac: 15,
		acType: '',
		hp: 40,
		maxHp: 60,
		hpDice: '',
		actions: [],
		reactions: [],
		legendaryActions: [],
		legendaryActionCount: null,
		languages: '',
		saves: {},
		damageResistances: '',
		damageImmunities: '',
		conditionImmunities: '',
		traits: [],
		senses: {},
		skills: [],
		variants: null
	};
}

function generatePlayerCharacter(id: string): PlayerCharacter {
	return {
		...generateCharacter(id),
		race: '',
		ac: 15,
		hp: 50,
		maxHp: 70,
		hitDice: 3,
		levels: [],
		equipment: [],
		attacks: [],
		spells: [],
		saves: {},
		skills: {},
		traits: [],
		resources: [],
		spellSlots: {},
		money: {
			cp: 0,
			ep: 0,
			gp: 0,
			pp: 0,
			sp: 0
		}
	};
}

function generateCharacter(id: string): Character {
	return {
		id,
		name: `testName-${id}`,
		imageRef: '',
		size: CharacterSize.Large,
		strength: 10,
		dexterity: 10,
		constitution: 10,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
		speed: {
			walk: 40
		},
		alignment: ''
	};
}
