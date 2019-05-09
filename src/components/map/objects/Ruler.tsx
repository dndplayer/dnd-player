import { Sprite, PixiComponent } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
// import * as Ease from 'pixi-ease';

interface Props {
	visible: boolean;
	measuring: boolean;
	start: PIXI.PointLike;
	end: PIXI.PointLike;
}

export default PixiComponent<Props, PIXI.Graphics>('Token', {
	create: (props: Props): any => {
		const g = new PIXI.Graphics();

		if (props.measuring) {
			g.lineStyle(20, 0xff0000)
				.moveTo(props.start.x, props.start.y)
				.lineTo(props.end.x, props.end.y);
		}

		g.visible = props.visible;

		return g;
	},
	applyProps: (instance: PIXI.Graphics, oldProps: Props, newProps: Props): void => {
		instance.clear();
		if (newProps.measuring && newProps.start && newProps.end) {
			const s = instance.toLocal(newProps.start);
			const e = instance.toLocal(newProps.end);

			instance
				.lineStyle(20, 0xff0000)
				.moveTo(s.x, s.y)
				.lineTo(e.x, e.y);
		}

		instance.visible = newProps.visible;
	},

	didMount: (instance: PIXI.Graphics, parent: PIXI.Container): void => {},

	willUnmount: (instance: PIXI.Container, parent: PIXI.Container): void => {}
});
