import * as PIXI from 'pixi.js';
import { EditablePolygonContainer } from './EditablePolygon';

export default class Midpoint extends PIXI.Graphics {
	constructor() {
		super();

		this.on('mouseover', this.onMouseOver);
		this.on('mouseout', this.onMouseOut);
		// this.on('mousedown', this.onMouseDown);
		// this.on('mouseup', this.onMouseUp);
		this.on('click', this.onMouseClick);
	}

	public midPointIndex: number;

	onMouseClick() {
		console.log(`Mouse Click Midpoint`);
		const p = this.parent as EditablePolygonContainer;
		if (p) {
			p.addNewPoint(this.midPointIndex, this.position);
		}
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
