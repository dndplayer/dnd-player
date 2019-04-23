import { Sprite, PixiComponent } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

interface DraggableSpriteProps {}

type Props = DraggableSpriteProps;

export default PixiComponent<any, PIXI.Sprite>('DraggableSprite', {
	create: (props: any): any => {
		const s = PIXI.Sprite.fromImage(props.image);

		// const onDragStart = (e: PIXI.interaction.InteractionEvent): void => {
		// 	const inst = e.currentTarget;
		// 	inst.alpha = 0.5;
		// 	(inst as any).dragging = true;
		// 	(inst as any).data = e.data;
		// };

		// const onDragEnd = (e: PIXI.interaction.InteractionEvent): void => {
		// 	const inst = e.currentTarget;
		// 	inst.alpha = 1.0;
		// 	(inst as any).dragging = false;
		// 	(inst as any).data = null;
		// };

		// const onDragMove = (e: PIXI.interaction.InteractionEvent): void => {
		// 	const inst = e.currentTarget;
		// 	if ((inst as any).dragging) {
		// 		const newPos = (inst as any).data.getLocalPosition(e.currentTarget.parent);
		// 		inst.x = newPos.x;
		// 		inst.y = newPos.y;
		// 	}
		// };

		// const onMouseOver = (e: PIXI.interaction.InteractionEvent): void => {
		// 	const inst = e.currentTarget as PIXI.Sprite;
		// 	if (inst) {
		// 		inst.tint = 0xff0000;
		// 	}
		// };

		// const onMouseOut = (e: PIXI.interaction.InteractionEvent): void => {
		// 	const inst = e.currentTarget as PIXI.Sprite;
		// 	if (inst) {
		// 		inst.tint = 0xffffff;
		// 	}
		// };

		s.interactive = true;
		s.buttonMode = true;
		s.anchor = new PIXI.ObservablePoint(() => {}, null, 0.5, 0.5);
		// s.on('mousedown', onDragStart);
		// s.on('mouseup', onDragEnd);
		// s.on('mouseupoutside', onDragEnd);
		// s.on('mousemove', onDragMove);
		// s.on('mouseover', onMouseOver);
		// s.on('mouseout', onMouseOut);

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
