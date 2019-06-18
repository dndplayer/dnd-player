import { Sprite, PixiComponent } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { OutlineFilter } from '@pixi/filter-outline';
// import * as Ease from 'pixi-ease';

interface Props {
	visible: boolean;
	measuring: boolean;
	start: PIXI.Point;
	end: PIXI.Point;
	thickness?: number;
	color?: number;
	distance?: string;
	scale: number;
}

export class Ruler extends PIXI.Container {
	constructor(props: Props) {
		super();
		const g = new PIXI.Graphics();
		g.filters = [new OutlineFilter(1, 0x202020)];
		g.name = 'ruler';
		this.visible = props.visible;

		const t = new PIXI.Text(props.distance || '', { fill: '#ccc' });
		t.filters = [new OutlineFilter(1, 0x202020)];
		t.name = 'distanceText';

		this.addChild(g);
		this.addChild(t);
	}

	redraw(oldProps: Props, newProps: Props): void {
		const g = this.getChildByName('ruler') as PIXI.Graphics;
		const t = this.getChildByName('distanceText') as PIXI.Text;

		g.clear();

		const col = newProps.color || 0xd29a38;

		if (newProps.measuring && newProps.start && newProps.end) {
			const s = g.toLocal(newProps.start);
			const e = g.toLocal(newProps.end);

			const theta = Math.atan2(
				newProps.end.y - newProps.start.y,
				newProps.end.x - newProps.start.x
			);

			g.beginFill(col, 0.8);
			g.drawCircle(s.x, s.y, newProps.thickness * newProps.scale || 20);
			g.endFill();

			const arrowSize = 15 * newProps.scale;
			g.lineStyle(newProps.thickness * newProps.scale || 20, col)
				.moveTo(s.x, s.y)
				.lineTo(e.x, e.y)
				.beginFill(col)
				.drawPolygon([
					e.x,
					e.y,
					e.x - arrowSize * Math.cos(theta) - (arrowSize * Math.sin(theta)) / 3,
					e.y - arrowSize * Math.sin(theta) + (arrowSize * Math.cos(theta)) / 3,
					e.x - (arrowSize / 2) * Math.cos(theta),
					e.y - (arrowSize / 2) * Math.sin(theta),
					e.x - arrowSize * Math.cos(theta) + (arrowSize * Math.sin(theta)) / 3,
					e.y - arrowSize * Math.sin(theta) - (arrowSize * Math.cos(theta)) / 3,
					e.x,
					e.y
				])
				.endFill();

			t.position.set(e.x + 10 * newProps.scale, e.y + 10 * newProps.scale);
			t.style.fontSize = 25 * newProps.scale;
		}

		if (newProps.distance !== oldProps.distance) {
			t.text = newProps.distance || '';
		}

		this.visible = newProps.visible;
	}
}
export default PixiComponent<Props, PIXI.Container>('Ruler', {
	create: (props: Props): any => {
		const ruler = new Ruler(props);
		return ruler;
	},
	applyProps: (instance: PIXI.Container, oldProps: Props, newProps: Props): void => {
		(instance as Ruler).redraw(oldProps, newProps);
	},

	didMount: (instance: PIXI.Container, parent: PIXI.Container): void => {},

	willUnmount: (instance: PIXI.Container, parent: PIXI.Container): void => {}
});
