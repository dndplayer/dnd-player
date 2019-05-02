import { Sprite, PixiComponent } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import * as Ease from 'pixi-ease';
import { OutlineFilter } from '@pixi/filter-outline';
import DraggableContainer from './DraggableContainer';
import Healthbar from './Healthbar';

interface Props {
	// imageUrl: string;
	resource: any;
	anchor?: { x: number; y: number };
	pivot?: { x: number; y: number };
	scale?: { x: number; y: number };
	position?: { x: number; y: number };
	rotation?: number;
	hp: { value: number; max: number };
	onUpdateObject: (data) => void;
	layerName: string;
	mapObjectId: string;
	isCircleHitarea?: boolean;
	customHitArea?:  // This isn't very serializable, need to figure out a better way to define custom hitAreas
		| PIXI.Rectangle
		| PIXI.Circle
		| PIXI.Ellipse
		| PIXI.Polygon
		| PIXI.RoundedRectangle
		| PIXI.HitArea;
}

class TokenContainer extends DraggableContainer {}

/**
 * TODO:
 * * Add a delete button to token
 * * Make click to select work (so it doesn't trigger dragging until actual movement)
 * * Make a popout properties panel (see Blender) on the left that is linked to the selected Token
 **/

export default PixiComponent<Props, TokenContainer>('Token', {
	create: (props: Props): any => {
		const cont = new TokenContainer();

		cont.onUpdateObject = props.onUpdateObject;
		cont.layerName = props.layerName;
		cont.mapObjectId = props.mapObjectId;

		cont.dragLocked = false;

		const s = new PIXI.Sprite(props.resource);
		if (props.isCircleHitarea) {
			s.hitArea = new PIXI.Circle(0, 0, s.width / 2);
		} else if (props.customHitArea) {
			s.hitArea = props.customHitArea;
		}
		s.name = 'sprite';

		// const g = new PIXI.Graphics();
		const g = new Healthbar();
		g.name = 'healthbar';

		cont.addChild(s);
		cont.addChild(g);

		return cont;
	},
	applyProps: (instance: PIXI.Container, oldProps: Props, newProps: Props): void => {
		// const g = instance.getChildByName('healthbar') as PIXI.Graphics;
		const g = instance.getChildByName('healthbar') as Healthbar;
		const s = instance.getChildByName('sprite') as PIXI.Sprite;

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
			const list = new Ease.list();
			list.add(
				new Ease.to(instance, { x: newProps.position.x, y: newProps.position.y }, 300, {
					ease: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
				})
			);
			instance.position.set(
				newProps.position ? newProps.position.x : 1.0,
				newProps.position ? newProps.position.y : 1.0
			);
		}
		if (newProps.rotation !== oldProps.rotation) {
			instance.rotation = newProps.rotation || 0.0;
		}

		if (newProps.hp !== oldProps.hp) {
			g.hp = newProps.hp.value;
			g.hpMax = newProps.hp.max;
			g.redraw(s.width);

			const healthBarMargin = 10;

			g.position.set(-(g.barWidth / 2), -(s.height / 2) - g.barHeight - healthBarMargin);
		}
	},

	didMount: (instance: TokenContainer, parent: PIXI.Container): void => {
		const onClick = (e: PIXI.interaction.InteractionEvent): void => {
			// const inst = instance as PIXI.Sprite;
			// if (inst && (inst as any).onSelect) {
			// 	(inst as any).onSelect(inst);
			// }
		};
		instance.on('mousedown', instance.onDragStart);
		instance.on('mouseup', instance.onDragEnd);
		instance.on('mouseupoutside', instance.onDragEnd);
		instance.on('mousemove', instance.onDragMove);
		instance.on('mouseover', instance.onMouseOver);
		instance.on('mouseout', instance.onMouseOut);
		instance.on('click', onClick);
	},

	willUnmount: (instance: PIXI.Container, parent: PIXI.Container): void => {
		instance.off('mousedown');
		instance.off('mouseup');
		instance.off('mouseupoutside');
		instance.off('mousemove');
		instance.off('mouseover');
		instance.off('mouseout');
		instance.off('click');
	}
});
