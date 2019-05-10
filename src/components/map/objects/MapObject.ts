import * as PIXI from 'pixi.js';
import * as Ease from 'pixi-ease';

export enum MapObjectVisibility {
	VISIBLE = 0,
	DM_VISIBLE = 1,
	HIDDEN = 2
}

export interface MapObjectProps {
	position?: PIXI.PointLike;
	rotation?: number;
	pivot?: PIXI.PointLike;
	// No Anchor here because it is only on Sprite, not container so can't be common here
	scale?: PIXI.PointLike;
	visibility?: MapObjectVisibility;
}

export default class MapObject extends PIXI.Container {
	layerName: string;
	mapObjectId: string;

	onUpdateObject: (mapObjectId, newData) => void; // An update callback to be used to update

	/**
	 * Any common prop application should be done here, for example
	 * all MapObjects will want to handle Position & rotation changes
	 * in a common way.
	 *
	 * In classes that ultimately extend this class remember to call
	 * super.innerApplyProps(...) in the applyProps definition.
	 *
	 * You can always override any behaviour after that call if you want
	 * to customise it in that component.
	 **/
	public innerApplyProps(
		instance: MapObject,
		oldProps: MapObjectProps,
		newProps: MapObjectProps
	): void {
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
		if (newProps.visibility !== oldProps.visibility) {
			switch (newProps.visibility) {
				case MapObjectVisibility.DM_VISIBLE:
					instance.visible = true;
					instance.alpha = 0.4;
					break;
				case MapObjectVisibility.HIDDEN:
					instance.visible = false;
					break;
				default:
					instance.visible = true;
					break;
			}
		}
	}
}
