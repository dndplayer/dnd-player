import { Sprite, PixiComponent } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

interface Props {
	imageUrl: string;
	anchor?: { x: number; y: number };
	pivot?: { x: number; y: number };
	scale?: { x: number; y: number };
	position?: { x: number; y: number };
	rotation?: number;
}

/**
 * A Custom map object for displaying static objects that have no level of interactivity.
 * The only way to modify the position of objects like these is via their property panel.
 * The use of these objects is that they won't clutter the map with draggable objects
 * that could accidentaly be moved.
 * In reality this is probably only useful for the main background image of a map as you
 * probably want the ease of dragging other scenery objects.
 **/
export default PixiComponent<Props, PIXI.Sprite>('Scenery', {
	create: (props: Props): any => {
		const s = PIXI.Sprite.fromImage(props.imageUrl);
		return s;
	},
	applyProps: (instance: PIXI.Sprite, oldProps: Props, newProps: Props): void => {
		if (newProps.anchor !== oldProps.anchor) {
			instance.anchor.set(
				newProps.anchor ? newProps.anchor.x : 0.5,
				newProps.anchor ? newProps.anchor.y : 0.5
			);
		}
		if (newProps.pivot !== oldProps.pivot) {
			instance.pivot.set(
				newProps.pivot ? newProps.pivot.x : 0.5,
				newProps.pivot ? newProps.pivot.y : 0.5
			);
		}
		if (newProps.scale !== oldProps.scale) {
			instance.scale.set(
				newProps.scale ? newProps.scale.x : 1.0,
				newProps.scale ? newProps.scale.y : 1.0
			);
		}
		if (newProps.position !== oldProps.position) {
			instance.position.set(
				newProps.position ? newProps.position.x : 1.0,
				newProps.position ? newProps.position.y : 1.0
			);
		}
		if (newProps.rotation !== oldProps.rotation) {
			instance.rotation = newProps.rotation || 0.0;
		}
	},
	didMount: (instance: PIXI.DisplayObject, parent: PIXI.Container): void => {},
	willUnmount: (instance: PIXI.Sprite, parent: PIXI.Container): void => {}
});
