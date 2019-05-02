import * as PIXI from 'pixi.js';
import * as Ease from 'pixi-ease';

export interface MapObjectProps {
	position?: PIXI.PointLike;
	rotation?: number;
	pivot?: PIXI.PointLike;
	// No Anchor here because it is only on Sprite, not container so can't be common here
	scale?: PIXI.PointLike;
}

export default class MapObject extends PIXI.Container {
	layerName: string;
	mapObjectId: string;

	onUpdateObject: (data) => void; // An update callback to be used to update

	// TODO: Put a method here that can be called in applyProps to spread props in higher up

	innerApplyProps = (
		instance: MapObject,
		oldProps: MapObjectProps,
		newProps: MapObjectProps
	): void => {
		if (newProps.position !== oldProps.position) {
			const list = new Ease.list();
			list.add(
				new Ease.to(
					instance,
					{
						x: newProps.position.x,
						y: newProps.position.y
					},
					300,
					{
						ease: 'easeInOutCubic'
					}
				)
			);
		}

		if (newProps.rotation !== oldProps.rotation) {
			const list = new Ease.list();
			list.add(
				new Ease.to(
					instance,
					{
						rotation: newProps.rotation || 0.0
					},
					300,
					{
						ease: 'easeInOutCubic'
					}
				)
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
	};
}
