/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import each from 'jest-each';
import 'jest-canvas-mock';
import * as PIXI from 'pixi.js';
import Handle from './Handle';

describe('Handle', () => {
	it('mouse down sets drag data and dragging = true', () => {
		const h = new Handle(new PIXI.Rectangle(0, 0, 100, 100));
		const testData = {
			stopPropagation: () => {},
			data: new PIXI.interaction.InteractionData()
		};
		h.onMouseDown(testData as any);

		expect((h as any)._dragging).toEqual(true);
		expect((h as any)._dragData).toEqual(testData.data);
	});

	it('mouse up clears drag data and dragging = false', () => {
		const h = new Handle(new PIXI.Rectangle(0, 0, 100, 100));
		const testData = {
			stopPropagation: () => {},
			data: new PIXI.interaction.InteractionData()
		};
		h.onMouseUp(testData as any);

		expect((h as any)._dragging).toEqual(false);
		expect((h as any)._dragData).toBeNull();
	});
});
