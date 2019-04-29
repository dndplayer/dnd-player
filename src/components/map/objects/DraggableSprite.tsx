import { Sprite, PixiComponent } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

// import { DotFilter } from '@pixi/filter-dot';
import { OutlineFilter } from '@pixi/filter-outline';

interface DraggableSpriteProps {
	position: any;
	onUpdateObject: (data) => void;
}

type Props = DraggableSpriteProps;

export default PixiComponent<any, PIXI.Sprite>('DraggableSprite', {
	create: (props: any): any => {
		const s = PIXI.Sprite.fromImage(props.image);

		if (props.anchor) {
			s.anchor.set(props.anchor.x, props.anchor.y);
		}

		if (props.pivot) {
			s.pivot.set(props.pivot.x, props.pivot.y);
		}

		if (props.scale) {
			s.scale.set(props.scale.x, props.scale.y);
		}

		if (props.position) {
			s.position.set(props.position.x, props.position.y);
		}

		if (props.rotation) {
			s.rotation = props.rotation;
		}

		// TODO: Investigate using the React-Pixi applyDefaultProps?
		//       or at-least something nicer than doing each props as above.

		s.interactive = true;
		s.buttonMode = true;

		// TODO: Attach callbacks to the actual sprite ?

		(s as any).onUpdateObject = props.onUpdateObject;
		(s as any).layerName = props.layerName;
		(s as any).mapObjectId = props.mapObjectId;

		// Filters to apply when hovering
		(s as any).hoverFilters = [new OutlineFilter(4, 0xff0000)];

		// Filters to apply when dragging, if any
		(s as any).dragFilters = [
			/*new DotFilter()*/
		];

		return s;
	},
	applyProps: (ins: PIXI.Sprite, oldProps: Props, newProps: Props): void => {
		if (
			oldProps.position &&
			newProps.position &&
			(oldProps.position.x !== newProps.position.x ||
				oldProps.position.y !== newProps.position.y)
		) {
			ins.position.set(newProps.position.x, newProps.position.y);
		}
	},
	didMount: (instance: PIXI.DisplayObject, parent: any): void => {
		const onDragStart = (e: PIXI.interaction.InteractionEvent): void => {
			instance.alpha = 0.5;
			(instance as any).dragging = true;
			(instance as any).data = e.data;

			(instance as any).filters = [
				...(instance as any).filters,
				...(instance as any).dragFilters
			];

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
			(instance as any).filters = (instance as any).filters.filter(
				x => !((instance as any).dragFilters.indexOf(x) >= 0)
			);

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
			if ((instance as any).dragging) {
				const newPos = (instance as any).data.getLocalPosition(e.currentTarget.parent);
				instance.x = newPos.x;
				instance.y = newPos.y;
			}
		};

		const onMouseOver = (e: PIXI.interaction.InteractionEvent): void => {
			const inst = instance as PIXI.Sprite;
			if (inst) {
				// inst.tint = 0x4ef125;
				inst.filters = (instance as any).hoverFilters;
			}
		};

		const onMouseOut = (e: PIXI.interaction.InteractionEvent): void => {
			const inst = instance as PIXI.Sprite;
			if (inst) {
				// inst.tint = 0xffffff;
				inst.filters = null;
			}
		};
		instance.on('mousedown', onDragStart);
		instance.on('mouseup', onDragEnd);
		instance.on('mouseupoutside', onDragEnd);
		instance.on('mousemove', onDragMove);
		instance.on('mouseover', onMouseOver);
		instance.on('mouseout', onMouseOut);
	},
	willUnmount: (instance: PIXI.DisplayObject, parent: any): void => {
		instance.off('mousedown');
		instance.off('mouseup');
		instance.off('mouseupoutside');
		instance.off('mousemove');
		instance.off('mouseover');
		instance.off('mouseout');
	}
});
