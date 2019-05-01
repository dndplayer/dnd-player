import * as PIXI from 'pixi.js';
import MapObject from './MapObject';
import { OutlineFilter } from '@pixi/filter-outline';

export default class DraggableContainer extends MapObject {
	dragGrabOffset?: PIXI.PointLike; // The offset a drag was started at to be applied to the sprite during the drag
	dragging: boolean; // Is this token currently being dragged
	dragData?: any; // Keep track of dragging event data during drag
	dragLocked: boolean; // Lock the token so it can't be dragged

	hoverFilters: any[] = [new OutlineFilter(4, 0xff0000)]; // Filters to be applied when hovering over this token
	dragFilters: any[] = []; // Filters to be applied when dragging this token

	interactive: boolean = true;
	buttonMode: boolean = true;

	// Core functionality
	onDragStart = (e: PIXI.interaction.InteractionEvent): void => {
		this.alpha = 0.7;
		this.dragging = true;
		this.dragData = e.data;
		this.dragGrabOffset = e.data.getLocalPosition(e.currentTarget);

		const sprite = this.getChildByName('sprite') as PIXI.Sprite;

		if (sprite) {
			sprite.filters = [...(sprite.filters || []), ...this.dragFilters];
		}

		// TODO: Move this sprite to a DragLayer that has the highest Z index
		//       when dragging starts to keep it on-top, then when it ends
		//       put it back on it's proper layer.
		// http://scottmcdonnell.github.io/pixi-examples/index.html?s=display&f=zorder.js&title=Z-order&plugins=pixi-display
	};

	onDragEnd = (e: PIXI.interaction.InteractionEvent): void => {
		this.alpha = 1.0;
		if (!this.dragData || !this.dragging) {
			return;
		}
		let lastPos = this.dragData.getLocalPosition(e.currentTarget.parent);
		if (this.dragGrabOffset) {
			lastPos.x -= this.dragGrabOffset.x;
			lastPos.y -= this.dragGrabOffset.y;
		}
		this.dragging = false;
		this.dragData = null;
		this.dragGrabOffset = null;

		// Remove the drag filters
		if (this.filters) {
			this.filters = this.filters.filter(x => !(this.dragFilters.indexOf(x) >= 0));
		}

		if (this.onUpdateObject) {
			this.onUpdateObject({
				layerName: this.layerName,
				mapObjectId: this.mapObjectId,
				newData: {
					position: lastPos
				}
			});
		}
	};

	onDragMove = (e: PIXI.interaction.InteractionEvent): void => {
		if (this.dragging) {
			const newPos = this.dragData.getLocalPosition(e.currentTarget.parent);
			this.x = newPos.x - (this.dragGrabOffset ? this.dragGrabOffset.x : 0);
			this.y = newPos.y - (this.dragGrabOffset ? this.dragGrabOffset.y : 0);
		}
	};

	onMouseOver = (e: PIXI.interaction.InteractionEvent): void => {
		const sprite = this.getChildByName('sprite') as PIXI.Sprite;
		if (sprite) {
			// inst.tint = 0x4ef125;
			sprite.filters = this.hoverFilters;
		}
	};

	onMouseOut = (e: PIXI.interaction.InteractionEvent): void => {
		const sprite = this.getChildByName('sprite') as PIXI.Sprite;
		if (sprite) {
			// inst.tint = 0xffffff;
			sprite.filters = null;
		}
	};
}
