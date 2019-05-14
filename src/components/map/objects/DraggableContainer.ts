import * as PIXI from 'pixi.js';
import MapObject, { MapObjectProps } from './MapObject';
import { OutlineFilter } from '@pixi/filter-outline';
import Healthbar from './Healthbar';

export interface DraggableContainerProps extends MapObjectProps {
	onSelected?: (mapObjectId: string) => void;
	isSelected: boolean;
	isSelectable?: boolean;
}

export default class DraggableContainer extends MapObject {
	// Drag handling
	public dragGrabOffset?: PIXI.PointLike; // The offset a drag was started at to be applied to the sprite during the drag
	public dragging: boolean; // Is this token currently being dragged
	public dragData?: any; // Keep track of dragging event data during drag
	public dragLocked: boolean; // Lock the token so it can't be dragged
	public clickedAvailable: boolean; // When a drag starts this is true until it can no longer be considered a click I.E. Movement has occurred.

	public hoverFilters: any[] = [new OutlineFilter(4, 0xff0000)]; // Filters to be applied when hovering over this token
	public dragFilters: any[] = []; // Filters to be applied when dragging this token

	public interactive: boolean = true;
	public buttonMode: boolean = true;

	// Click selection handling
	public isSelected: boolean = false;
	public isSelectable: boolean = true;
	public onSelected?: (mapObjectId: string) => void;
	private dragStartPosition?: PIXI.PointLike;
	private static clickThreshold: number = 5; // Tune this to account for shaky hands etc

	innerApplyProps(
		instance: DraggableContainer,
		oldProps: DraggableContainerProps,
		newProps: DraggableContainerProps
	) {
		this.isSelectable = newProps.isSelectable;
		this.interactive = !!newProps.isSelectable;
		super.innerApplyProps(instance, oldProps, newProps);
	}
	// Core functionality
	onDragStart = (e: PIXI.interaction.InteractionEvent): void => {
		if (!this.isSelectable) {
			return;
		}
		this.alpha = 0.7;
		this.dragging = true;
		this.dragData = e.data;
		this.dragGrabOffset = new PIXI.Point(
			e.data.getLocalPosition(e.currentTarget).x * e.currentTarget.scale.x,
			e.data.getLocalPosition(e.currentTarget).y * e.currentTarget.scale.y
		);
		this.clickedAvailable = true;

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
		if (!this.isSelectable) {
			return;
		}
		if (!this.clickedAvailable) {
			e.stopPropagation(); // Prevent this triggering the stage.on('mouseup') which handles de-selects
		}

		this.alpha = 1.0;
		if (!this.dragData || !this.dragging) {
			return;
		}
		let lastPos = this.dragData.getLocalPosition(e.currentTarget.parent);
		if (this.dragGrabOffset) {
			lastPos.x -= this.dragGrabOffset.x;
			lastPos.y -= this.dragGrabOffset.y;
		}

		let dragged = true;
		if (this.isSelectable && this.clickedAvailable && this.onSelected) {
			dragged = false;
			if (this.isSelected) {
				// this.onSelected({ mapObjectId: null }); // De-select
			} else {
				this.onSelected(this.mapObjectId);
			}
		}

		this.dragging = false;
		this.dragData = null;
		this.dragGrabOffset = null;
		this.dragStartPosition = null;
		this.clickedAvailable = false;

		// Remove the drag filters
		if (this.filters) {
			this.filters = this.filters.filter(x => !(this.dragFilters.indexOf(x) >= 0));
		}

		if (dragged && this.onUpdateObject) {
			this.onUpdateObject(this.mapObjectId, {
				position: lastPos
			});
		}
	};

	onDragMove = (e: PIXI.interaction.InteractionEvent): void => {
		if (this.dragging) {
			const globalLastPos = this.dragData.global;
			const dX = Math.abs(globalLastPos.x - this.dragStartPosition.x);
			const dY = Math.abs(globalLastPos.y - this.dragStartPosition.y);
			if (
				!this.clickedAvailable ||
				dX > DraggableContainer.clickThreshold ||
				dY > DraggableContainer.clickThreshold
			) {
				this.clickedAvailable = false;
				const newPos = this.dragData.getLocalPosition(e.currentTarget.parent);
				this.x = newPos.x - (this.dragGrabOffset ? this.dragGrabOffset.x : 0);
				this.y = newPos.y - (this.dragGrabOffset ? this.dragGrabOffset.y : 0);
			}
		}
	};

	onMouseOver = (e: PIXI.interaction.InteractionEvent): void => {
		const sprite = this.getChildByName('sprite') as PIXI.Sprite;
		if (sprite && this.isSelectable) {
			// inst.tint = 0x4ef125;
			sprite.filters = this.hoverFilters;
		}
	};

	onMouseOut = (e: PIXI.interaction.InteractionEvent): void => {
		const sprite = this.getChildByName('sprite') as PIXI.Sprite;
		if (sprite && this.isSelectable) {
			// inst.tint = 0xffffff;
			sprite.filters = null;
		}
	};
}
