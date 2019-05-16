import { Sprite, PixiComponent } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
// import * as Ease from 'pixi-ease';

interface Props {
	visible: boolean;
	measuring: boolean;
	start: PIXI.Point;
	end: PIXI.Point;
	thickness?: number;
	color?: number;
	distance?: string;
}

export default PixiComponent<Props, PIXI.Container>('Ruler', {
	create: (props: Props): any => {
		const c = new PIXI.Container();
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

		c.visible = props.visible;

		const t = new PIXI.Text(props.distance || '', { fill: 'white' });
		t.name = 'distanceText';

		c.addChild(g);
		c.addChild(t);

		return c;
	},
	applyProps: (instance: PIXI.Container, oldProps: Props, newProps: Props): void => {
		const g = instance.getChildByName('ruler') as PIXI.Graphics;
		const t = instance.getChildByName('distanceText') as PIXI.Text;

		g.clear();

		const col = newProps.color || 0xff0000;

		if (newProps.measuring && newProps.start && newProps.end) {
			const s = g.toLocal(newProps.start);
			const e = g.toLocal(newProps.end);

			g.beginFill(col, 0.8);
			g.drawCircle(s.x, s.y, newProps.thickness);
			g.endFill();

			g.lineStyle(newProps.thickness || 20, col)
				.moveTo(s.x, s.y)
				.lineTo(e.x, e.y);

			t.position.set(e.x, e.y);
			t.style.fontSize = newProps.thickness * 2;
		}

		if (newProps.distance !== oldProps.distance) {
			t.text = newProps.distance || '';
		}

		instance.visible = newProps.visible;
	},

	didMount: (instance: PIXI.Container, parent: PIXI.Container): void => {},

	willUnmount: (instance: PIXI.Container, parent: PIXI.Container): void => {}
});
