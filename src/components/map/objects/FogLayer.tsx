import { PixiComponent } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import DraggableContainer from './DraggableContainer';

interface Props {}

export default PixiComponent<Props, DraggableContainer>('FogLayer', {
	create: (props: Props): any => {
		const c = new DraggableContainer();

		const p = new PIXI.Polygon(0, 0, 0, 10000, 10000, 10000, 10000, 0);
		const p2 = new PIXI.Circle(3000, 3000, 1500);
		const p3 = new PIXI.Rectangle(150, 150, 600, 600);
		const p4 = new PIXI.Polygon(2000, 2000, 2000, 4500, 5000, 3500, 500, 300);
		const p5 = new PIXI.Polygon(6000, 6000, 6000, 9000, 9000, 9000, 9000, 6000, 7500, 4500);

		// const test = (PIXI.utils as any).earcut([0, 0, 0, 10000, 10000, 10000, 10000, 0],
		// 	[500, 500, 500, 4000, 4000, 4000, 4000, 500]);

		const g = new PIXI.Graphics();
		g.beginFill(0x776f4f);
		g.drawPolygon(p);
		g.drawPolygon(p4);
		g.addHole();
		g.drawPolygon(p5);
		g.addHole();
		g.endFill();
		g.hitArea = p;
		g.interactive = true;
		g.buttonMode = true;
		g.alpha = 0.4;
		// g.blendMode = 20;

		// const g2 = new PIXI.Graphics();
		// g2.beginFill(0xff0000);
		// g2.drawShape(p2);
		// g2.drawShape(p3);
		// g2.drawPolygon(p4);
		// g2.endFill();

		// c.addChild(g2);
		// g.mask = g2;

		c.addChild(g);

		return c;
	},
	applyProps: (instance: DraggableContainer, oldProps: Props, newProps: Props): void => {
		instance.innerApplyProps(instance, oldProps, newProps);
	},
	didMount: (instance: DraggableContainer, parent: PIXI.Container): void => {
		instance.on('mousedown', instance.onDragStart);
		instance.on('mouseup', instance.onDragEnd);
		instance.on('mouseupoutside', instance.onDragEnd);
		instance.on('mousemove', instance.onDragMove);
		instance.on('mouseover', instance.onMouseOver);
		instance.on('mouseout', instance.onMouseOut);
	},
	willUnmount: (instance: DraggableContainer, parent: PIXI.Container): void => {
		instance.off('mousedown');
		instance.off('mouseup');
		instance.off('mouseupoutside');
		instance.off('mousemove');
		instance.off('mouseover');
		instance.off('mouseout');
	}
});
