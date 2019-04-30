import { Sprite, PixiComponent } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { OutlineFilter } from '@pixi/filter-outline';

interface Props {
	// imageUrl: string;
	resource: any;
	anchor?: { x: number; y: number };
	pivot?: { x: number; y: number };
	scale?: { x: number; y: number };
	position?: { x: number; y: number };
	rotation?: number;
	hp: { value: number; max: number };
	onUpdateObject: (data) => void;
	layerName: string;
	mapObjectId: string;
}

class TokenContainer extends PIXI.Container {
	// Filters
	hoverFilters: any[]; // Filters to be applied when hovering over this token
	dragFilters: any[]; // Filters to be applied when dragging this token

	onUpdateObject: (data) => void; // An update callback to be used to update
	layerName: string; // The layer this token is on to be included in update events back up.
	mapObjectId: string; // The Map Object ID to be included in update events back up.

	// Dragging
	dragGrabOffset?: PIXI.PointLike; // The offset a drag was started at to be applied to the sprite during the drag
	dragging: boolean; // Is this token currently being dragged
	dragData?: any; // Keep track of dragging event data during drag
	dragLocked: boolean; // Lock the token so it can't be dragged

	// General
}

/**
 * TODO:
 * * Add a delete button to token
 * * Make click to select work (so it doesn't trigger dragging until actual movement)
 * * Make a popout properties panel (see Blender) on the left that is linked to the selected Token
 **/

export default PixiComponent<Props, TokenContainer>('Token', {
	create: (props: Props): any => {
		const cont = new TokenContainer();

		cont.interactive = true;
		cont.buttonMode = true;

		// Filters to apply when hovering
		cont.hoverFilters = [new OutlineFilter(4, 0xff0000)];

		// Filters to apply when dragging, if any
		cont.dragFilters = [
			/*new DotFilter()*/
		];

		cont.onUpdateObject = props.onUpdateObject;
		cont.layerName = props.layerName;
		cont.mapObjectId = props.mapObjectId;

		cont.dragLocked = false;

		// const s = PIXI.Sprite.fromImage(props.imageUrl);
		const s = new PIXI.Sprite(props.resource);
		s.name = 'sprite';

		const g = new PIXI.Graphics();
		g.name = 'healthbar';

		cont.addChild(s);
		cont.addChild(g);

		return cont;
	},
	applyProps: (instance: PIXI.Container, oldProps: Props, newProps: Props): void => {
		const g = instance.getChildByName('healthbar') as PIXI.Graphics;
		const s = instance.getChildByName('sprite') as PIXI.Sprite;

		if (newProps.anchor !== oldProps.anchor) {
			if (s) {
				s.anchor.set(
					newProps.anchor ? newProps.anchor.x : 0.5,
					newProps.anchor ? newProps.anchor.y : 0.5
				);
			}
		}
		if (newProps.pivot !== oldProps.pivot) {
			instance.pivot.set(
				newProps.pivot ? newProps.pivot.x : 0.5,
				newProps.pivot ? newProps.pivot.y : 0.5
			);
		}
		if (newProps.scale !== oldProps.scale) {
			instance.scale.set(
				newProps.scale ? newProps.scale.x : 1.0,
				newProps.scale ? newProps.scale.y : 1.0
			);
		}
		if (newProps.position !== oldProps.position) {
			instance.position.set(
				newProps.position ? newProps.position.x : 1.0,
				newProps.position ? newProps.position.y : 1.0
			);
		}
		if (newProps.rotation !== oldProps.rotation) {
			instance.rotation = newProps.rotation || 0.0;
		}

		if (newProps.hp !== oldProps.hp) {
			const healthbarHeight = 64;
			const healthbarMargin = 10;
			const healthbarPercent = newProps.hp.value / newProps.hp.max;

			g.clear();
			// g.lineStyle(4, 0xffffff);
			// g.drawRect(0, 0, s.width, healthbarHeight);
			g.beginFill(0x761633);
			g.drawRect(0, 0, s.width, healthbarHeight);
			g.endFill();

			g.beginFill(0xff0000);
			g.drawRect(0, 0, s.width * healthbarPercent, healthbarHeight);
			g.endFill();

			g.position.set(-(s.width / 2), -(s.height / 2) - healthbarHeight - healthbarMargin);
		}
	},

	didMount: (instance: TokenContainer, parent: PIXI.Container): void => {
		const onDragStart = (e: PIXI.interaction.InteractionEvent): void => {
			instance.alpha = 0.7;
			instance.dragging = true;
			instance.dragData = e.data;
			instance.dragGrabOffset = e.data.getLocalPosition(e.currentTarget);

			const sprite = instance.getChildByName('sprite') as PIXI.Sprite;

			if (sprite) {
				sprite.filters = [...sprite.filters, ...instance.dragFilters];
			}

			// TODO: Move this sprite to a DragLayer that has the highest Z index
			//       when dragging starts to keep it on-top, then when it ends
			//       put it back on it's proper layer.
			// http://scottmcdonnell.github.io/pixi-examples/index.html?s=display&f=zorder.js&title=Z-order&plugins=pixi-display
		};

		const onDragEnd = (e: PIXI.interaction.InteractionEvent): void => {
			instance.alpha = 1.0;
			if (!instance.dragData || !instance.dragging) {
				return;
			}
			let lastPos = instance.dragData.getLocalPosition(e.currentTarget.parent);
			if (instance.dragGrabOffset) {
				lastPos.x -= instance.dragGrabOffset.x;
				lastPos.y -= instance.dragGrabOffset.y;
			}
			instance.dragging = false;
			instance.dragData = null;
			instance.dragGrabOffset = null;

			// Remove the drag filters
			if (instance.filters) {
				instance.filters = instance.filters.filter(
					x => !(instance.dragFilters.indexOf(x) >= 0)
				);
			}

			if (instance.onUpdateObject) {
				instance.onUpdateObject({
					layerName: instance.layerName,
					mapObjectId: instance.mapObjectId,
					newData: {
						position: lastPos
					}
				});
			}
		};

		const onDragMove = (e: PIXI.interaction.InteractionEvent): void => {
			if (instance.dragging) {
				const newPos = instance.dragData.getLocalPosition(e.currentTarget.parent);
				instance.x = newPos.x - (instance.dragGrabOffset ? instance.dragGrabOffset.x : 0);
				instance.y = newPos.y - (instance.dragGrabOffset ? instance.dragGrabOffset.y : 0);
			}
		};

		const onMouseOver = (e: PIXI.interaction.InteractionEvent): void => {
			const sprite = instance.getChildByName('sprite') as PIXI.Sprite;
			if (sprite) {
				// inst.tint = 0x4ef125;
				sprite.filters = instance.hoverFilters;
			}
		};

		const onMouseOut = (e: PIXI.interaction.InteractionEvent): void => {
			const sprite = instance.getChildByName('sprite') as PIXI.Sprite;
			if (sprite) {
				// inst.tint = 0xffffff;
				sprite.filters = null;
			}
		};
		const onClick = (e: PIXI.interaction.InteractionEvent): void => {
			// const inst = instance as PIXI.Sprite;
			// if (inst && (inst as any).onSelect) {
			// 	(inst as any).onSelect(inst);
			// }
		};
		instance.on('mousedown', onDragStart);
		instance.on('mouseup', onDragEnd);
		instance.on('mouseupoutside', onDragEnd);
		instance.on('mousemove', onDragMove);
		instance.on('mouseover', onMouseOver);
		instance.on('mouseout', onMouseOut);
		instance.on('click', onClick);
	},

	willUnmount: (instance: PIXI.Container, parent: PIXI.Container): void => {
		instance.off('mousedown');
		instance.off('mouseup');
		instance.off('mouseupoutside');
		instance.off('mousemove');
		instance.off('mouseover');
		instance.off('mouseout');
		instance.off('click');
	}
});
