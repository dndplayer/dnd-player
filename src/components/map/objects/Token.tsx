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

export default PixiComponent<Props, PIXI.Container>('Token', {
	create: (props: Props): any => {
		const cont = new PIXI.Container();

		cont.interactive = true;
		cont.buttonMode = true;

		// Filters to apply when hovering
		(cont as any).hoverFilters = [new OutlineFilter(4, 0xff0000)];

		// Filters to apply when dragging, if any
		(cont as any).dragFilters = [
			/*new DotFilter()*/
		];

		(cont as any).onUpdateObject = props.onUpdateObject;
		(cont as any).layerName = props.layerName;
		(cont as any).mapObjectId = props.mapObjectId;

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
			const healthbarPercent = newProps.hp.value / newProps.hp.max;

			g.clear();
			// g.lineStyle(4, 0xffffff);
			// g.drawRect(0, 0, s.width, healthbarHeight);
			g.beginFill(0x761633);
			g.drawRect(0, 0, s.width, healthbarHeight);
			g.endFill();

			g.beginFill(0xff0000);
			// g.beginFill(Math.random() * 0xffffff);
			g.drawRect(0, 0, s.width * healthbarPercent, healthbarHeight);
			g.endFill();

			g.position.set(-(s.width / 2), -(s.height / 2) - healthbarHeight);
		}
	},

	didMount: (instance: PIXI.Container, parent: PIXI.Container): void => {
		const onDragStart = (e: PIXI.interaction.InteractionEvent): void => {
			instance.alpha = 0.5;
			(instance as any).dragging = true;
			(instance as any).data = e.data;

			const sprite = instance.getChildByName('sprite') as PIXI.Sprite;

			if (sprite) {
				sprite.filters = [...sprite.filters, ...(instance as any).dragFilters];
			}

			// TODO: Move this sprite to a DragLayer that has the highest Z index
			//       when dragging starts to keep it on-top, then when it ends
			//       put it back on it's proper layer.
			// http://scottmcdonnell.github.io/pixi-examples/index.html?s=display&f=zorder.js&title=Z-order&plugins=pixi-display
		};

		const onDragEnd = (e: PIXI.interaction.InteractionEvent): void => {
			instance.alpha = 1.0;
			if (!(instance as any).data || !(instance as any).dragging) {
				return;
			}
			const lastPos = (instance as any).data.getLocalPosition(e.currentTarget.parent);
			(instance as any).dragging = false;
			(instance as any).data = null;

			// Remove the drag filters
			if ((instance as any).filters) {
				(instance as any).filters = (instance as any).filters.filter(
					x => !((instance as any).dragFilters.indexOf(x) >= 0)
				);
			}

			if ((instance as any).onUpdateObject) {
				(instance as any).onUpdateObject({
					layerName: (instance as any).layerName,
					mapObjectId: (instance as any).mapObjectId,
					newData: {
						position: lastPos
					}
				});
			}
		};

		const onDragMove = (e: PIXI.interaction.InteractionEvent): void => {
			// TODO: Include the offset of the mouse from the sprite/container center, so dragging
			//       doesn't jump. I.E. if mouse down is 50,50 from sprite center, then on all new
			//       pos assignments below, also increase the pos by that offset.
			if ((instance as any).dragging) {
				const newPos = (instance as any).data.getLocalPosition(e.currentTarget.parent);
				instance.x = newPos.x;
				instance.y = newPos.y;
			}
		};

		const onMouseOver = (e: PIXI.interaction.InteractionEvent): void => {
			const sprite = instance.getChildByName('sprite') as PIXI.Sprite;
			if (sprite) {
				// inst.tint = 0x4ef125;
				sprite.filters = (instance as any).hoverFilters;
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
			const inst = instance as PIXI.Sprite;
			if (inst && (inst as any).onSelect) {
				(inst as any).onSelect(inst);
			}
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
