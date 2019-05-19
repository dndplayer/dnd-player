import * as PIXI from 'pixi.js';
import { PixiComponent } from '@inlet/react-pixi';
import { FogData } from '../../models/Map';

interface Props {
	fogData?: FogData;
	dm: boolean;
	editing: boolean;
	viewportZoom: number;
}

export default PixiComponent<Props, PIXI.Container>('BasicFogLayer', {
	create: (props: Props): any => {
		const c = new PIXI.Container();
		c.position.set(0, 0);
		c.pivot.set(0.5, 0.5);

		const curtain = new PIXI.Graphics();
		curtain.name = 'curtain';
		c.addChild(curtain);

		const mask = new PIXI.Graphics();
		mask.name = 'mask';
		c.addChild(mask);

		return c;
	},
	applyProps: (instance: PIXI.Container, oldProps: Props, newProps: Props): void => {
		instance.interactive = newProps.editing;

		if (!oldProps.fogData && !newProps.fogData) {
			return;
		}

		if (
			!newProps.fogData.maskPolygons ||
			Object.keys(newProps.fogData.maskPolygons).length === 0
		) {
			return;
		}

		const mask = instance.getChildByName('mask') as PIXI.Graphics;
		const curtain = instance.getChildByName('curtain') as PIXI.Graphics;
		if (!mask || !curtain) {
			return;
		}

		const fCol =
			typeof newProps.fogData.colour === 'string' && newProps.fogData.colour.startsWith('#')
				? newProps.fogData.colour.replace('#', '0x')
				: newProps.fogData.colour;
		const fogColour = (fCol as any) || 0x0;

		curtain.clear();
		curtain.beginFill(fogColour, newProps.dm ? 0.5 : 1);
		curtain.drawRect(-10000000, -10000000, 20000000, 20000000);
		curtain.endFill();

		mask.clear();
		mask.beginFill(0xffffff);

		Object.keys(newProps.fogData.maskPolygons).forEach(
			(key): void => {
				const poly = newProps.fogData.maskPolygons[key];
				if (!poly || !poly.points || poly.points.length % 2 !== 0) {
					return;
				}
				const mappedPoints = poly.points.map((x, idx) =>
					idx % 2 === 0 ? x + poly.position.x : x + poly.position.y
				);
				mask.drawPolygon(mappedPoints);
			}
		);

		// for (let polyKey of newProps.fogData.maskPolygons) {
		// 	const poly = newProps.fogData.maskPolygons[polyKey];
		// 		// for (const poly of newProps.fogData.maskPolygons) {
		// 	if (!poly || !poly.points || poly.points.length % 2 !== 0) {
		// 		// We require an even number
		// 		continue;
		// 	}
		// 	// mask.moveTo(poly.position.x, poly.position.y)
		// 	// mask.drawPolygon(poly.points);
		// 	const mappedPoints = poly.points.map((x, idx) =>
		// 		idx % 2 === 0 ? x + poly.position.x : x + poly.position.y
		// 	);
		// 	mask.drawPolygon(mappedPoints);
		// }
		mask.endFill();

		const blurRadius = 32 * newProps.viewportZoom;

		instance.filters = [
			new PIXI.filters.BlurFilter(blurRadius),
			new PIXI.filters.AlphaFilter()
		];
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
