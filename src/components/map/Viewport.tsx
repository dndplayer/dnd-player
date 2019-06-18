import * as PIXI from 'pixi.js';
import { PixiComponent } from '@inlet/react-pixi';
import Viewport from 'pixi-viewport';

interface ViewportComponentProps {
	app?: PIXI.Application;
	name?: string;
	screenWidth: number;
	screenHeight: number;
	onZoom: (x: number) => void;
}
export const ViewportComponent = PixiComponent<ViewportComponentProps, Viewport>('Viewport', {
	create: props => {
		const v = new Viewport({
			screenWidth: props.screenWidth,
			screenHeight: props.screenHeight,
			worldWidth: 1000,
			worldHeight: 1000,
			divWheel: props.app
				? (props.app.renderer.plugins.interaction as any).interactionDOMElement
				: null,
			interaction: props.app ? props.app.renderer.plugins.interaction : null
		});

		v.clampZoom({
			minWidth: 1000,
			minHeight: 1000,
			maxWidth: 100000,
			maxHeight: 100000
		});

		v.name = props.name || 'viewport';

		v.drag({
			mouseButtons: 'right'
		})
			.pinch()
			.wheel({ smooth: 5 })
			.decelerate();

		v.on('zoomed', () => {
			if (props.onZoom) {
				props.onZoom(v.scale.x);
			}
		});

		return v;
	},
	applyProps: (instance, oldProps, newProps) => {
		// Handle resizes correctly for movement etc
		if (
			oldProps.screenWidth !== newProps.screenWidth ||
			oldProps.screenHeight !== newProps.screenHeight
		) {
			instance.resize(newProps.screenWidth, newProps.screenHeight);
		}
	}
});
