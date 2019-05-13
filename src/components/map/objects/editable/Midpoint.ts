import * as PIXI from 'pixi.js';

export default class Midpoint extends PIXI.Graphics {
	constructor() {
		super();

		this.on('mouseover', this.onMouseOver);
		this.on('mouseout', this.onMouseOut);
		// this.on('mousedown', this.onMouseDown);
		// this.on('mouseup', this.onMouseUp);
		this.on('click', this.onMouseClick);
	}

	onMouseClick() {
		console.log(`Mouse Click Midpoint`);
	}

	// onMouseDown() {
	// 	console.log(`Mouse Down Midpoint`);
	// }

	// onMouseUp() {
	// 	console.log(`Mouse Up Midpoint`);
	// }

	onMouseOver() {
		console.log(`Mouse Over Midpoint`);
	}

	onMouseOut() {
		console.log(`Mouse Out Midpoint`);
	}
}
