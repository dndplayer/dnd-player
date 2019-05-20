import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.scss';
import { CharacterSpell, PlayerCharacter } from '../../../../models/Character';
import ArrayEditor from './ArrayEditor';

import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import EffectsEditor from './EffectsEditor';

export default class SpellsEditor extends ArrayEditor<CharacterSpell> {
	prop: string = 'spells';
	heading: string = 'Spells';

	mapItem(idx: string, item: CharacterSpell): React.ReactNode {
		return (
			<SpellEditor
				spell={item}
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
	spell: CharacterSpell;
	character: PlayerCharacter;
	removeItem: () => void;
}

export class SpellEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { spell } = this.props;

		return (
			<div className={css.action}>
				<div className={css.button} onClick={this.props.removeItem}>
					<Icon path={mdiDelete} size={1} color={'#ccc'} />
				</div>
				<input
					className={css.italicHeading}
					value={spell.name}
					placeholder="Name"
					onChange={e => this.props.updateItemProperty('name', e.target.value)}
				/>
				<input
					className={css.italicHeading}
					value={spell.school}
					placeholder="conjuration"
					onChange={e => this.props.updateItemProperty('school', e.target.value)}
				/>
				<input
					className={css.italicHeading}
					value={spell.level}
					type="number"
					placeholder="4"
					min="0"
					max="9"
					onChange={e => this.props.updateItemProperty('level', parseInt(e.target.value))}
				/>
				<EffectsEditor
					effects={this.props.spell.effects}
					updateEffects={e => this.props.updateItemProperty('effects', [...e])}
				/>
			</div>
		);
	}
}
