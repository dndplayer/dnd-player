import { Sprite, PixiComponent } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import * as Ease from 'pixi-ease';
import DraggableContainer, { DraggableContainerProps } from './DraggableContainer';
import { OutlineFilter } from '@pixi/filter-outline';

interface Props extends DraggableContainerProps {
	// imageUrl: string;
	resource: any;
	anchor?: { x: number; y: number }; // Anchor is Sprite specific and not on container
	onUpdateObject: (data) => void;
	layerName: string;
	mapObjectId: string;
}

/**
 * A Custom map object for displaying static objects that have no level of interactivity.
 * The only way to modify the position of objects like these is via their property panel.
 * The use of these objects is that they won't clutter the map with draggable objects
 * that could accidentaly be moved.
 * In reality this is probably only useful for the main background image of a map as you
 * probably want the ease of dragging other scenery objects.
 **/
export default PixiComponent<Props, DraggableContainer>('Scenery', {
	create: (props: Props): any => {
		// const s = PIXI.Sprite.fromImage(props.imageUrl);
		const s = new PIXI.Sprite(props.resource);
		s.name = 'sprite';
		const cont = new DraggableContainer();
		cont.addChild(s);

		// Scenery mouse over outline is green
		cont.hoverFilters = [new OutlineFilter(4, 0x00ff00)];

		cont.onUpdateObject = props.onUpdateObject;
		cont.layerName = props.layerName;
		cont.mapObjectId = props.mapObjectId;

		return cont;
	},
	applyProps: (instance: DraggableContainer, oldProps: Props, newProps: Props): void => {
		const s = instance.getChildByName('sprite') as PIXI.Sprite;

		instance.innerApplyProps(instance, oldProps, newProps);

		if (newProps.resource !== oldProps.resource) {
			if (s) {
				s.texture = newProps.resource;
			}
		}

		if (newProps.anchor !== oldProps.anchor) {
			if (s) {
				s.anchor.set(
					newProps.anchor ? newProps.anchor.x : 0.5,
					newProps.anchor ? newProps.anchor.y : 0.5
				);
			}
		}
	},
	didMount: (instance: DraggableContainer, parent: PIXI.Container): void => {
		instance.on('mousedown', instance.onDragStart);
		instance.on('mouseup', instance.onDragEnd);
		instance.on('mouseupoutside', instance.onDragEnd);
		instance.on('mousemove', instance.onDragMove);
		instance.on('mouseover', instance.onMouseOver);
		instance.on('mouseout', instance.onMouseOut);
		// instance.on('click', onClick);
	},
	willUnmount: (instance: DraggableContainer, parent: PIXI.Container): void => {
		instance.off('mousedown');
		instance.off('mouseup');
		instance.off('mouseupoutside');
		instance.off('mousemove');
		instance.off('mouseover');
		instance.off('mouseout');
		// instance.off('click');
	}
});
