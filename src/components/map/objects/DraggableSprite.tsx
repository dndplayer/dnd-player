import { Sprite, PixiComponent } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

interface DraggableSpriteProps {}

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

		return s;
	},
	applyProps: (ins: PIXI.Sprite, oldProps: Props, newProps: Props): void => {
		// ins.clear();
		// ins.beginFill(newProps.color);
		// ins.drawRect(newProps.x, newProps.y, 100, 100);
		// ins.endFill();
	},
	didMount: (instance: PIXI.DisplayObject, parent: any): void => {
		const onDragStart = (e: PIXI.interaction.InteractionEvent): void => {
			instance.alpha = 0.5;
			(instance as any).dragging = true;
			(instance as any).data = e.data;
		};

		const onDragEnd = (e: PIXI.interaction.InteractionEvent): void => {
			instance.alpha = 1.0;
			(instance as any).dragging = false;
			(instance as any).data = null;
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
				inst.tint = 0xff0000;
			}
		};

		const onMouseOut = (e: PIXI.interaction.InteractionEvent): void => {
			const inst = instance as PIXI.Sprite;
			if (inst) {
				inst.tint = 0xffffff;
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
