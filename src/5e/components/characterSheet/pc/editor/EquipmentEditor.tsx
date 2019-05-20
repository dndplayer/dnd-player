import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.scss';
import { PlayerCharacter, CharacterEquipment } from '../../../../models/Character';
import ArrayEditor from './ArrayEditor';

import Icon from '@mdi/react';
import { mdiDelete, mdiPlus } from '@mdi/js';
import { AttackEditor } from './AttacksEditor';

export default class EquipmentEditor extends ArrayEditor<CharacterEquipment> {
	prop: string = 'equipment';
	heading: string = 'Equipment';

	mapItem(idx: string, item: CharacterEquipment): React.ReactNode {
		return (
			<EquipmentItemEditor
				item={item}
				key={idx}
				character={this.props.character}
				updateItemProperty={(p, v) => this.updateItemProperty(idx, p, v)}
				removeItem={() => this.removeItem(idx)}
			/>
		);
	}
}

interface Props {
	updateItemProperty: (property: string, value: any) => void;
	item: CharacterEquipment;
	character: PlayerCharacter;
	removeItem: () => void;
}

export class EquipmentItemEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { item } = this.props;

		const attacks = [];
		for (const idx in item.attacks || []) {
			const a = item.attacks[idx];
			attacks.push(
				<AttackEditor
					key={idx}
					attack={a}
					updateItemProperty={(p, v) => this.updateAttackProperty(idx, p, v)}
					removeItem={() => this.removeAttack(idx)}
				/>
			);
		}
		return (
			<div className={css.action}>
				<div className={css.button} onClick={this.props.removeItem}>
					<Icon path={mdiDelete} size={1} color={'#ccc'} />
				</div>
				<input
					className={css.italicHeading}
					value={item.name}
					placeholder="Name"
					onChange={e => this.props.updateItemProperty('name', e.target.value)}
				/>
				<input
					className={css.italicHeading}
					value={item.weight}
					type="number"
					min="0"
					placeholder="weight"
					onChange={e =>
						this.props.updateItemProperty('weight', parseInt(e.target.value))
					}
				/>
				{attacks}
				<div className={css.button} onClick={() => this.addAttack()}>
					<Icon path={mdiPlus} size={1} color={'#ccc'} />
				</div>
			</div>
		);
	}

	updateAttackProperty(itemIdx: string, property: string, value: any): void {
		const newItems = [...this.props.item.attacks];
		newItems[itemIdx][property] = value;
		this.props.updateItemProperty('attacks', newItems);
	}

	removeAttack(itemIdx: string): void {
		const newItems = [...this.props.item.attacks];
		newItems.splice(parseInt(itemIdx), 1);
		this.props.updateItemProperty('attacks', newItems);
	}

	addAttack(): void {
		this.props.updateItemProperty('attacks', [...(this.props.item.attacks || []), {}]);
	}
}
