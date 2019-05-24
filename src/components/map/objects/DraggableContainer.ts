import * as PIXI from 'pixi.js';
import MapObject, { MapObjectProps } from './MapObject';
import { OutlineFilter } from '@pixi/filter-outline';
import { Ruler } from './Ruler';
import { calculateDistance } from '../MapUtils';

export interface DraggableContainerProps extends MapObjectProps {
	onSelected?: (mapObjectId: string) => void;
	isSelected: boolean;
	isSelectable?: boolean;
	viewportZoom: number;
	range?: number;
	onMove?: (dX: number, dY: number, sourceMapObjectId: string) => void;
}

export default class DraggableContainer extends MapObject {
	// Drag handling
	public dragGrabOffset?: PIXI.PointLike; // The offset a drag was started at to be applied to the sprite during the drag
	public dragging: boolean; // Is this token currently being dragged
	public dragData?: any; // Keep track of dragging event data during drag
	public dragLocked: boolean; // Lock the token so it can't be dragged
	public clickedAvailable: boolean; // When a drag starts this is true until it can no longer be considered a click I.E. Movement has occurred.
	public onMove?: (dX: number, dY: number, sourceMapObjectId: string) => void;

	public hoverFilters: any[] = [new OutlineFilter(4, 0xff0000)]; // Filters to be applied when hovering over this token
	public dragFilters: any[] = [new PIXI.filters.AlphaFilter(0.7)]; // Filters to be applied when dragging this token

	public interactive: boolean = true;
	public buttonMode: boolean = true;
	public viewportZoom: number = 1;
	public range: number = null;

	// Click selection handling
	public isSelected: boolean = false;
	public isSelectable: boolean = true;
	public onSelected?: (mapObjectId: string) => void;
	private dragStartPosition?: PIXI.PointLike;
	private static clickThreshold: number = 5; // Tune this to account for shaky hands etc
	private _ruler: Ruler;

	innerApplyProps(
		instance: DraggableContainer,
		oldProps: DraggableContainerProps,
		newProps: DraggableContainerProps
	) {
		this.isSelectable = newProps.isSelectable;
		this.interactive = !!newProps.isSelectable;
		this.viewportZoom = newProps.viewportZoom;
		this.range = newProps.range;
		super.innerApplyProps(instance, oldProps, newProps);
	}
	// Core functionality
	onDragStart = (e: PIXI.interaction.InteractionEvent): void => {
		if (!this.isSelectable) {
			return;
		}
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

		this._ruler = new Ruler({
			start: new PIXI.Point(0, 0),
			end: new PIXI.Point(0, 0),
			measuring: false,
			scale: 1 / this.viewportZoom,
			visible: false,
			distance: ''
		});
		this.parent.addChild(this._ruler);

		// TODO: Move this sprite to a DragLayer that has the highest Z index
		//       when dragging starts to keep it on-top, then when it ends
		//       put it back on it's proper layer.
		// http://scottmcdonnell.github.io/pixi-examples/index.html?s=display&f=zorder.js&title=Z-order&plugins=pixi-display
	};

	onDragEnd = (e: PIXI.interaction.InteractionEvent): void => {
		const sprite = this.getChildByName('sprite') as PIXI.Sprite;
		if (sprite) {
			sprite.filters = sprite.filters.filter(x => !(this.dragFilters.indexOf(x) >= 0));
		}

		if (this._ruler) {
			this.parent.removeChild(this._ruler);
			this._ruler.destroy();
			this._ruler = null;
		}

		if (!this.isSelectable) {
			return;
		}
		if (!this.clickedAvailable) {
			e.stopPropagation(); // Prevent this triggering the stage.on('mouseup') which handles de-selects
		}

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

				if (this.onMove) {
					this.onMove(dX, dY, this.mapObjectId);
				}

				if (this._ruler) {
					const start = new PIXI.Point(
						this.dragStartPosition.x - this.dragGrabOffset.x * this.viewportZoom,
						this.dragStartPosition.y - this.dragGrabOffset.y * this.viewportZoom
					);
					const end = new PIXI.Point(
						globalLastPos.x - this.dragGrabOffset.x * this.viewportZoom,
						globalLastPos.y - this.dragGrabOffset.y * this.viewportZoom
					);

					const distance = calculateDistance(
						[start.x, start.y],
						[end.x, end.y],
						this.viewportZoom
					);
					this._ruler.redraw(
						{
							scale: 1 / this.viewportZoom,
							start: this.dragStartPosition,
							end: this.dragStartPosition,
							measuring: true,
							visible: true,
							distance: null,
							thickness: 3
						},
						{
							scale: 1 / this.viewportZoom,
							start: start,
							end: end,
							measuring: true,
							visible: true,
							color: this.range && distance > this.range ? 0xe04b35 : undefined,
							distance: `${distance.toFixed(1)} ft.`,
							thickness: 3
						}
					);
				}
			}
		}
	};

	onMouseOver = (e: PIXI.interaction.InteractionEvent): void => {
		const sprite = this.getChildByName('sprite') as PIXI.Sprite;
		if (sprite && this.isSelectable && !this.isSelected) {
			sprite.filters = [...(sprite.filters || []), ...this.hoverFilters];
		}
	};

	onMouseOut = (e: PIXI.interaction.InteractionEvent): void => {
		const sprite = this.getChildByName('sprite') as PIXI.Sprite;
		if (sprite && this.isSelectable) {
			sprite.filters = sprite.filters.filter(x => !(this.hoverFilters.indexOf(x) >= 0));
		}
	};
}
