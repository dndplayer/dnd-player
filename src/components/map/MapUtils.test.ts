/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { calculateDistance, getMidpointOfPoints, groupObjectsByLayer } from './MapUtils';
import each from 'jest-each';
import { MapData } from '../../models/Map';

describe('MapUtils', () => {
	describe('getMidpointOfPoints', () => {
		it('should return 0,0 if no points are passed', () => {
			const x = getMidpointOfPoints([]);
			expect(x).toEqual([0, 0]);
		});

		it('should return null if null is passed', () => {
			const x = getMidpointOfPoints(null);
			expect(x).toBeNull();
		});

		it('should return null if undefined is passed', () => {
			const x = getMidpointOfPoints(null);
			expect(x).toBeNull();
		});

		it('should return the midpoint of a line', () => {
			const x = getMidpointOfPoints([0, 0, 100, 100]);
			expect(x).toEqual([50, 50]);
		});

		it('should return the midpoint of a triangle', () => {
			const x = getMidpointOfPoints([0, 0, 100, 100, 100, 0]);
			expect(x[0]).toBeCloseTo(66.6, 0.1);
			expect(x[1]).toBeCloseTo(33.3, 0.1);
		});

		it('should return the midpoint of a square', () => {
			const x = getMidpointOfPoints([0, 0, 0, 500, 500, 500, 500, 0]);
			expect(x).toEqual([250, 250]);
		});

		it('should return the midpoint of a polygon', () => {
			const x = getMidpointOfPoints([50, 50, 600, 400, 700, 350, 200, 100, 70, 40]);
			expect(x).toEqual([324, 188]);
		});
	});

	describe('calculateDistance', () => {
		it('should return 0.0 if start and end are equal', () => {
			const x = calculateDistance([0, 0], [0, 0], 1);
			expect(x).toEqual('0.0');
		});

		it('should return correct distances', () => {
			const x = calculateDistance([0, 0], [200, 200], 1);
			expect(x).toEqual('7.1'); // 282.842 / 40
		});

		each`
			scale    | expected
			${1}     | ${'7.1'}
			${0.5}   | ${'14.1'}
			${10}    | ${'0.7'}
			${100}   | ${'0.1'}
			${0.001} | ${'7071.1'}
		`.it('should scale correctly if scale argument is changed', ({ scale, expected }) => {
			const x = calculateDistance([0, 0], [200, 200], scale);
			expect(x).toEqual(expected);
		});
	});

	describe('groupObjectsByLayer', () => {
		it('should return an empty array if no map data is passed', () => {
			const x = groupObjectsByLayer(null);
			expect(x).toEqual([]);
		});

		it('should return an empty array if a map with no objects is passed', () => {
			const map = generateMockMap();
			const x = groupObjectsByLayer(map);
			expect(x).toEqual([]);
		});

		/**
		 * This test is a little janky and could do with sorting at some point
		 */
		it('should group objects by layer name', () => {
			const testObj = {
				id: '123',
				name: 'test object',
				anchor: { x: 0.5, y: 0.5 },
				pivot: { x: 0.5, y: 0.5 },
				position: { x: 0, y: 0 },
				rotation: 0,
				scale: { x: 1, y: 1 },
				dmOnly: false,
				type: 'npc',
				layer: 'tokens',
				imageRef: null,
				pcId: '1',
				npcId: null,
				hp: { value: 50, max: 50 }
			};
			const map = generateMockMap();
			map.objects = { [testObj.id]: testObj };
			const x = groupObjectsByLayer(map);
			expect(x).toEqual([
				{
					name: 'tokens',
					zIndex: 1,
					objects: [
						{
							...testObj
						}
					]
				}
			]);
		});
	});
});

function generateMockMap(): MapData {
	return {
		id: '123123123123',
		objects: {},
		fog: {
			maskPolygons: [],
			colour: null
		},
		backgroundColour: '#444444',
		layers: {
			background: {
				name: 'background'
			},
			tokens: {
				name: 'tokens'
			}
		}
	};
}
