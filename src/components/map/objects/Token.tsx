import { PixiComponent } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import * as Ease from 'pixi-ease';
import DraggableContainer, { DraggableContainerProps } from './DraggableContainer';
import Healthbar from './Healthbar';
import Ac from './Ac';
import { OutlineFilter } from '@pixi/filter-outline';

interface Props extends DraggableContainerProps {
	// imageUrl: string;
	resource: any;
	anchor?: { x: number; y: number };
	hp: { value: number; max: number };
	ac: number;
	onUpdateObject: (mapObjectId, data) => void;
	layerName: string;
	mapObjectId: string;
	isCircleHitarea?: boolean;
	customHitArea?:  // This isn't very serializable, need to figure out a better way to define custom hitAreas
		| PIXI.Rectangle
		| PIXI.Circle
		| PIXI.Ellipse
		| PIXI.Polygon
		| PIXI.RoundedRectangle;
	// | PIXI.HitArea;
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
		cont.onMove = props.onMove;
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
		s.width = 200;
		s.height = 200;
		const filter = new OutlineFilter(4, 0xcccccc);
		filter.padding = 6;
		s.filters = [filter];

		// const g = new PIXI.Graphics();
		const hp = new Healthbar();
		hp.name = 'healthbar';

		const ac = new Ac();
		ac.name = 'ac';

		cont.addChild(s);
		cont.addChild(hp);
		cont.addChild(ac);

		return cont;
	},
	applyProps: (instance: TokenContainer, oldProps: Props, newProps: Props): void => {
		const hp = instance.getChildByName('healthbar') as Healthbar;
		const s = instance.getChildByName('sprite') as PIXI.Sprite;
		const ac = instance.getChildByName('ac') as Ac;

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

		if (newProps.rotation !== oldProps.rotation) {
			const list = new Ease.list();
			list.add(
				new Ease.to(
					s,
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

		if (newProps.ac !== oldProps.ac) {
			ac.ac = newProps.ac;
			ac.position.set(0, s.height / 2 - 10);
			ac.redraw();
		}

		if (newProps.hp !== oldProps.hp) {
			hp.hp = newProps.hp.value;
			hp.hpMax = newProps.hp.max;
			hp.redraw(s.width);

			const healthBarMargin = 10;

			hp.position.set(-(hp.barWidth / 2), -(s.height / 2) - hp.barHeight - healthBarMargin);
		}

		if (newProps.isSelected !== oldProps.isSelected) {
			instance.isSelected = newProps.isSelected;
			if (s && s.filters) {
				s.filters = s.filters.filter(x => !(instance.hoverFilters.indexOf(x) >= 0));
				(s.filters[0] as OutlineFilter).enabled = instance.isSelected;
			}

			hp.showText = newProps.isSelected;
			hp.redraw(s.width);
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
