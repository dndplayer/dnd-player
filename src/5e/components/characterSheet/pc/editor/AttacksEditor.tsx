import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.css';
import { PlayerCharacter, CharacterAttack } from '../../../../models/Character';
import ArrayEditor from './ArrayEditor';

import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import EffectsEditor from './EffectsEditor';

export default class AttacksEditor extends ArrayEditor<CharacterAttack> {
	prop: string = 'attacks';
	heading: string = 'Innate Attacks';

	mapItem(idx: string, item: CharacterAttack): React.ReactNode {
		return (
			<AttackEditor
				attack={item}
				key={idx}
				updateItemProperty={(p, v) => this.updateItemProperty(idx, p, v)}
				removeItem={() => this.removeItem(idx)}
			/>
		);
	}
}

interface Props {
	updateItemProperty: (property: string, value: any) => void;
	attack: CharacterAttack;
	removeItem: () => void;
}

export class AttackEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { attack } = this.props;

		return (
			<div className={css.action}>
				<div className={css.button} onClick={this.props.removeItem}>
					<Icon path={mdiDelete} size={1} color={'#ccc'} />
				</div>
				<input
					className={css.italicHeading}
					value={attack.title}
					placeholder="Name"
					onChange={e => this.props.updateItemProperty('title', e.target.value)}
				/>
				<input
					className={css.italicHeading}
					value={attack.range}
					type="number"
					min="0"
					placeholder="range"
					onChange={e => this.props.updateItemProperty('range', parseInt(e.target.value))}
				/>
				<input
					className={css.italicHeading}
					value={attack.longRange}
					type="number"
					placeholder="4"
					min="0"
					onChange={e =>
						this.props.updateItemProperty('longRange', parseInt(e.target.value))
					}
				/>
				<EffectsEditor
					effects={this.props.attack.effects}
					updateEffects={e => this.props.updateItemProperty('effects', [...e])}
				/>
			</div>
		);
	}
}
