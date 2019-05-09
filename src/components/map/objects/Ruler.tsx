import { Sprite, PixiComponent } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
// import * as Ease from 'pixi-ease';

interface Props {
	visible: boolean;
	measuring: boolean;
	start: PIXI.PointLike;
	end: PIXI.PointLike;
	thickness?: number;
	color?: number;
}

export default PixiComponent<Props, PIXI.Graphics>('Ruler', {
	create: (props: Props): any => {
		const g = new PIXI.Graphics();
		g.name = 'ruler';
		const col = props.color || 0xff0000;

		if (props.measuring) {
			g.lineStyle(props.thickness || 20, col)
				.moveTo(props.start.x, props.start.y)
				.lineTo(props.end.x, props.end.y);
			g.beginFill(col);
			g.drawCircle(props.start.x, props.start.y, props.thickness * 3);
			g.endFill();
		}

		g.visible = props.visible;

		return g;
	},
	applyProps: (instance: PIXI.Graphics, oldProps: Props, newProps: Props): void => {
		instance.clear();

		const col = newProps.color || 0xff0000;

		if (newProps.measuring && newProps.start && newProps.end) {
			const s = instance.toLocal(newProps.start);
			const e = instance.toLocal(newProps.end);

			instance.beginFill(col, 0.8);
			instance.drawCircle(s.x, s.y, newProps.thickness);
			instance.endFill();

			instance
				.lineStyle(newProps.thickness || 20, col)
				.moveTo(s.x, s.y)
				.lineTo(e.x, e.y);
		}

		instance.visible = newProps.visible;
	},

	didMount: (instance: PIXI.Graphics, parent: PIXI.Container): void => {},

	willUnmount: (instance: PIXI.Container, parent: PIXI.Container): void => {}
});
