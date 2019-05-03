import * as PIXI from 'pixi.js';
import MapObject, { MapObjectProps } from './MapObject';
import { OutlineFilter } from '@pixi/filter-outline';

export interface DraggableContainerProps extends MapObjectProps {
	onSelected?: (data) => void;
	isSelected: boolean;
	isSelectable?: boolean;
}

export default class DraggableContainer extends MapObject {
	// Drag handling
	public dragGrabOffset?: PIXI.PointLike; // The offset a drag was started at to be applied to the sprite during the drag
	public dragging: boolean; // Is this token currently being dragged
	public dragData?: any; // Keep track of dragging event data during drag
	public dragLocked: boolean; // Lock the token so it can't be dragged

	public hoverFilters: any[] = [new OutlineFilter(4, 0xff0000)]; // Filters to be applied when hovering over this token
	public dragFilters: any[] = []; // Filters to be applied when dragging this token

	public interactive: boolean = true;
	public buttonMode: boolean = true;

	// Click selection handling
	public isSelected: boolean = false;
	public isSelectable: boolean = true;
	public onSelected?: (data) => void;
	private dragStartPosition?: PIXI.PointLike;
	private static clickThreshold: number = 0.1; // Tune this to account for shaky hands etc

	// Core functionality
	onDragStart = (e: PIXI.interaction.InteractionEvent): void => {
		this.alpha = 0.7;
		this.dragging = true;
		this.dragData = e.data;
		this.dragGrabOffset = e.data.getLocalPosition(e.currentTarget);

		this.dragStartPosition = new PIXI.Point(e.data.global.x, e.data.global.y);

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
		e.stopPropagation(); // Prevent this triggering the stage.on('mouseup') which handles de-selects

		this.alpha = 1.0;
		if (!this.dragData || !this.dragging) {
			return;
		}
		let lastPos = this.dragData.getLocalPosition(e.currentTarget.parent);
		if (this.dragGrabOffset) {
			lastPos.x -= this.dragGrabOffset.x;
			lastPos.y -= this.dragGrabOffset.y;
		}

		let isClick = false;

		if (this.dragStartPosition && this.isSelectable) {
			const globalLastPos = this.dragData.global;
			const dX = globalLastPos.x - this.dragStartPosition.x;
			const dY = globalLastPos.y - this.dragStartPosition.y;

			// TODO: Only process selection if this.isSelectable = true
			if (dX < DraggableContainer.clickThreshold && dY < DraggableContainer.clickThreshold) {
				isClick = true;
				if (this.onSelected) {
					if (this.isSelected) {
						// TODO: if this is already selected, do we want second click to de-select?
						this.onSelected({ mapObjectId: null }); // De-select // TODO: This doesn't seem to work
					} else {
						this.onSelected({ mapObjectId: this.mapObjectId }); // TODO: Include extra click data
					}
				}
			}
		}

		this.dragging = false;
		this.dragData = null;
		this.dragGrabOffset = null;
		this.dragStartPosition = null;

		// Remove the drag filters
		if (this.filters) {
			this.filters = this.filters.filter(x => !(this.dragFilters.indexOf(x) >= 0));
		}

		if (isClick) {
			return;
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
