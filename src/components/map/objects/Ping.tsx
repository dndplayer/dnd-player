import * as PIXI from 'pixi.js';
import { PixiComponent } from '@inlet/react-pixi';

interface Props {
	position: PIXI.PointLike;
}

/**
 * Display some graphic that looks "pingy" I.E. an expanding and fading
 * circle possibly.
 */
export default PixiComponent<Props, PIXI.Container>('Ping', {
	create: (props: Props): any => {
		const c = new PIXI.Container();

		c.pivot.set(0.5, 0.5);
		c.position.set(props.position.x, props.position.y);

		const g = new PIXI.Graphics();
		g.beginFill(0xff0000);
		g.drawStar(0, 0, 5, 500, 300);
		g.endFill();

		c.addChild(g);

		return c;
	},
	applyProps: (instance: PIXI.Container, oldProps: Props, newProps: Props): void => {},
	didMount: (instance: PIXI.Container, parent: PIXI.Container): void => {},
	willUnmount: (instance: PIXI.Container, parent: PIXI.Container): void => {}
});
