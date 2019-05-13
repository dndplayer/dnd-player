import * as PIXI from 'pixi.js';
import { PixiComponent } from '@inlet/react-pixi';
import Midpoint from './Midpoint';
import Handle from './Handle';

export class EditablePolygonContainer extends PIXI.Container {
	constructor(updatePoly: (data: PIXI.Polygon) => void) {
		super();

		this._updatePoly = updatePoly;
	}

	updatePoly = (data: PIXI.Polygon) => {
		this._updatePoly(data);
	};

	private _updatePoly: (data: PIXI.Polygon) => void;
}

interface Props {
	editMode?: boolean;
	updatePoly: (data: PIXI.Polygon) => void;
}

export default PixiComponent<Props, EditablePolygonContainer>('EditablePolygon', {
	create: (props: Props): EditablePolygonContainer => {
		const c = new EditablePolygonContainer(props.updatePoly);

		const points: PIXI.Point[] = [
			new PIXI.Point(0, 0),
			new PIXI.Point(500, 500),
			new PIXI.Point(500, 0)
		];

		const poly = new PIXI.Polygon(points);
		poly.close();

		const g = new PIXI.Graphics();
		g.lineStyle(8, 0x00ff00);
		g.drawPolygon(poly);
		g.endFill();
		g.name = 'poly';
		g.hitArea = poly;

		c.addChild(g);

		const handleSize = 64;
		let j = 0;
		for (let p of points) {
			const rect = new PIXI.Rectangle(
				p.x - handleSize / 2,
				p.y - handleSize / 2,
				handleSize,
				handleSize
			);
			const handle = new Handle(rect);
			handle.name = `handles-${j++}`;
			handle.interactive = true;
			handle.hitArea = rect;
			handle.lineStyle(8, 0xff0000);
			handle.drawShape(rect);
			c.addChild(handle);
		}

		let halfwayPoints: PIXI.Point[] = [];
		for (let i = 0; i < points.length; i++) {
			const p1 = points[i];
			const p2 = points[i === points.length - 1 ? 0 : i + 1];
			const midPoint = new PIXI.Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
			halfwayPoints.push(midPoint);
		}

		const midPointsSize = 64;
		let k = 0;
		for (let p of halfwayPoints) {
			const midPoint = new Midpoint();
			midPoint.name = `midPoints-${k++}`;
			midPoint.lineStyle(8, 0x0000ff);
			const rect = new PIXI.Rectangle(
				p.x - midPointsSize / 2,
				p.y - midPointsSize / 2,
				midPointsSize,
				midPointsSize
			);
			midPoint.drawShape(rect);
			midPoint.interactive = true;
			midPoint.hitArea = rect;
			c.addChild(midPoint);
		}

		return c;
	},
	applyProps: (instance: EditablePolygonContainer, oldProps: Props, newProps: Props): void => {
		const p = instance.getChildByName('poly') as PIXI.Graphics;
	},
	didMount: (instance: EditablePolygonContainer, parent: PIXI.Container): void => {
		const onClick = (e: PIXI.interaction.InteractionEvent): void => {
			// const inst = instance as PIXI.Sprite;
			// if (inst && (inst as any).onSelect) {
			// 	(inst as any).onSelect(inst);
			// }
		};
		// instance.on('mousedown', instance.onDragStart);
		// instance.on('mouseup', instance.onDragEnd);
		// instance.on('mouseupoutside', instance.onDragEnd);
		// instance.on('mousemove', instance.onDragMove);
		// instance.on('mouseover', instance.onMouseOver);
		// instance.on('mouseout', instance.onMouseOut);
		// instance.on('click', onClick);
	},

	willUnmount: (instance: EditablePolygonContainer, parent: PIXI.Container): void => {
		// instance.off('mousedown');
		// instance.off('mouseup');
		// instance.off('mouseupoutside');
		// instance.off('mousemove');
		// instance.off('mouseover');
		// instance.off('mouseout');
		// instance.off('click');
	}
});
