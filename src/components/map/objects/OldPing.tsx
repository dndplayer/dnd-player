import * as PIXI from 'pixi.js';
import { PixiComponent } from '@inlet/react-pixi';

import PingFrame1 from '../images/PingFrame1.png';
import PingFrame2 from '../images/PingFrame2.png';
import PingFrame3 from '../images/PingFrame3.png';
import PingFrame4 from '../images/PingFrame4.png';
import PingFrame5 from '../images/PingFrame5.png';
import PingFrame6 from '../images/PingFrame6.png';

interface Props {
	position: PIXI.PointLike;
	viewportZoom: number;
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

		if (props.viewportZoom) {
			c.scale.set(0.6 * (1 / props.viewportZoom), 0.6 * (1 / props.viewportZoom));
		}

		// const g = new PIXI.Graphics();
		// g.beginFill(0xff0000);
		// g.drawStar(0, 0, 5, 500, 300);
		// g.endFill();
		// c.addChild(g);

		const texArr = [
			PIXI.Texture.from(PingFrame1),
			PIXI.Texture.from(PingFrame2),
			PIXI.Texture.from(PingFrame3),
			PIXI.Texture.from(PingFrame4),
			PIXI.Texture.from(PingFrame5),
			PIXI.Texture.from(PingFrame6)
		];

		const s = new PIXI.AnimatedSprite(texArr);
		s.anchor.set(0.5, 0.5);
		s.animationSpeed = 0.1;
		s.tint = 0xff0000; // TODO: Tint with users colour
		s.play();
		c.addChild(s);

		return c;
	},
	applyProps: (instance: PIXI.Container, oldProps: Props, newProps: Props): void => {
		if (oldProps.viewportZoom !== newProps.viewportZoom) {
			instance.scale.set(
				0.6 * (1 / newProps.viewportZoom),
				0.6 * (1 / newProps.viewportZoom)
			);
		}
	},
	didMount: (instance: PIXI.Container, parent: PIXI.Container): void => {},
	willUnmount: (instance: PIXI.Container, parent: PIXI.Container): void => {}
});
