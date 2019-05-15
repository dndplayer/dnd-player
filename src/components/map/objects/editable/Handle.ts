import * as PIXI from 'pixi.js';
import { EditablePolygonContainer } from './EditablePolygon';

export default class Handle extends PIXI.Graphics {
	constructor(handleRect: PIXI.Rectangle) {
		super();

		this._handleRect = handleRect;
		this._fill = false;

		this._dragging = false;
		this._dragData = null;

		this.on('mouseover', this.onMouseOver);
		this.on('mouseout', this.onMouseOut);
		this.on('mousedown', this.onMouseDown);
		this.on('mouseup', this.onMouseUp);
		this.on('mousemove', this.onMouseMove);
	}

	public pointIndex: number;

	private _handleRect: PIXI.Rectangle;
	private _fill: boolean;

	private _dragging: boolean;
	private _dragData?: PIXI.interaction.InteractionData;

	onMouseDown(e: PIXI.interaction.InteractionEvent): void {
		e.stopPropagation();

		this._fill = true;
		console.log(`Mouse Down Handle`);

		this._dragging = true;
		this._dragData = e.data;

		// this.redraw();
	}

	onMouseUp(e: PIXI.interaction.InteractionEvent): void {
		e.stopPropagation();

		this._fill = false;
		console.log(`Mouse Up Handle`);

		this._dragging = false;
		this._dragData = null;

		// this.redraw();
	}

	onMouseMove(e: PIXI.interaction.InteractionEvent): void {
		if (this._dragging) {
			e.stopPropagation();

			const newPos = this._dragData.getLocalPosition(e.currentTarget.parent);
			this.position.set(newPos.x, newPos.y);

			const p = this.parent as EditablePolygonContainer;
			if (p) {
				let points = [...p.localPoints]; // Copy
				points.splice(this.pointIndex * 2, 2);
				points.splice(this.pointIndex * 2, 0, newPos.x, newPos.y);
				p.updateLocal(points);
				// DEBUG
				// console.log(points);
			}
		}
	}

	onMouseOver(e: PIXI.interaction.InteractionEvent): void {
		console.log(`Mouse Over Handle`);
		this.alpha = 0.7;

		// this.redraw();
	}

	onMouseOut(e: PIXI.interaction.InteractionEvent): void {
		this._fill = false;
		console.log(`Mouse Out Handle`);
		this.alpha = 1;

		// this.redraw();
	}

	// redraw(): void {
	// 	this.clear();

	// 	if (this._fill) {
	// 		this.beginFill(0xff0000, 0.8);
	// 	}
	// 	this.lineStyle(8, 0xff0000);
	// 	this.drawShape(this._handleRect);
	// 	if (this._fill) {
	// 		this.endFill();
	// 	}
	// }
}
