import { Sprite, PixiComponent } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import * as Ease from 'pixi-ease';
import { OutlineFilter } from '@pixi/filter-outline';
import DraggableContainer, { DraggableContainerProps } from './DraggableContainer';
import Healthbar from './Healthbar';

interface Props extends DraggableContainerProps {
	// imageUrl: string;
	resource: any;
	anchor?: { x: number; y: number };
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

		cont.isSelectable = props.isSelectable || true;
		cont.onSelected = props.onSelected;
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
	applyProps: (instance: TokenContainer, oldProps: Props, newProps: Props): void => {
		// const g = instance.getChildByName('healthbar') as PIXI.Graphics;
		const g = instance.getChildByName('healthbar') as Healthbar;
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

		if (newProps.hp !== oldProps.hp) {
			g.hp = newProps.hp.value;
			g.hpMax = newProps.hp.max;
			g.redraw(s.width);

			const healthBarMargin = 10;

			g.position.set(-(g.barWidth / 2), -(s.height / 2) - g.barHeight - healthBarMargin);
		}

		if (newProps.isSelected !== oldProps.isSelected) {
			if (s) {
				s.tint = newProps.isSelected && !oldProps.isSelected ? 0x0000ff : 0xffffff;
			}
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
