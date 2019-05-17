import * as PIXI from 'pixi.js';
import { PixiComponent } from '@inlet/react-pixi';

interface Props {
	visiblePolys: number[][];
	dm: boolean;
	editing: boolean;
}

export default PixiComponent<Props, PIXI.Container>('BasicFogLayer', {
	create: (props: Props): any => {
		const c = new PIXI.Container();
		c.position.set(0, 0);
		c.pivot.set(0.5, 0.5);

		return c;
	},
	applyProps: (instance: PIXI.Container, oldProps: Props, newProps: Props): void => {
		instance.interactive = newProps.editing;

		if (
			newProps.dm === oldProps.dm &&
			newProps.visiblePolys.flat(2).toString() === oldProps.visiblePolys.flat(2).toString()
		) {
			return;
		}

		instance.interactive = false; //newProps.dm;
		const g = new PIXI.Graphics();
		g.beginFill(0x000000, newProps.dm ? 0.5 : 1)
			.drawRect(-10000000, -10000000, 20000000, 20000000)
			.endFill();
		const g2 = new PIXI.Graphics();
		g2.beginFill(0xffffff);
		for (const poly of newProps.visiblePolys) {
			g2.drawPolygon(poly);
		}
		g2.endFill();

		instance.removeChildren();
		instance.addChild(g);
		instance.addChild(g2);
		instance.filters = [new PIXI.filters.BlurFilter(16), new PIXI.filters.AlphaFilter()];
		instance.filters[1].blendMode = PIXI.BLEND_MODES.MULTIPLY;
		/*
		if (oldProps.viewportZoom !== newProps.viewportZoom) {
			instance.scale.set(
				0.6 * (1 / newProps.viewportZoom),
				0.6 * (1 / newProps.viewportZoom)
			);
        }
        */
	},
	didMount: (instance: PIXI.Container, parent: PIXI.Container): void => {
		const onClick = (e: PIXI.interaction.InteractionEvent): void => {};
		instance.on('click', onClick);
	},
	willUnmount: (instance: PIXI.Container, parent: PIXI.Container): void => {
		instance.off('click');
	}
});
