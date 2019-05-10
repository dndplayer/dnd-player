import * as PIXI from 'pixi.js';
import { PixiComponent } from '@inlet/react-pixi';
import Viewport from 'pixi-viewport';

interface ViewportComponentProps {
	app?: PIXI.Application;
	name?: string;
}
export const ViewportComponent = PixiComponent<ViewportComponentProps, Viewport>('Viewport', {
	create: props => {
		const v = new Viewport({
			screenWidth: window.innerWidth,
			screenHeight: window.innerHeight,
			worldWidth: 1000,
			worldHeight: 1000,
			divWheel: props.app
				? props.app.renderer.plugins.interaction.interactionDOMElement
				: null,
			interaction: props.app ? props.app.renderer.plugins.interaction : null
		});

		v.name = props.name || 'viewport';

		v.drag({
			mouseButtons: 'right'
		})
			.pinch()
			.wheel({ smooth: 5 })
			.decelerate();

		return v;
	},
	applyProps: (instance, oldProps, newProps) => {
		if (oldProps.app !== newProps.app) {
		}
	}
});
