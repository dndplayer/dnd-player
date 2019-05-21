import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.scss';
import {
	CharacterSpell,
	PlayerCharacter,
	CharacterSpellReference
} from '../../../../models/Character';
import ArrayEditor from './ArrayEditor';

import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';

export default class SpellsEditor extends ArrayEditor<CharacterSpellReference, CharacterSpell> {
	prop: string = 'spells';
	heading: string = '';
	direction = 'column' as 'column';

	mapItem(idx: string, item: CharacterSpellReference): React.ReactNode {
		return (
			<SpellEditor
				spells={this.props.lookup}
				spell={item}
				key={idx}
				character={this.props.character}
				removeItem={() => this.removeItem(idx)}
				updateItemProperty={(p, v) => this.updateItemProperty(idx, p, v)}
			/>
		);
	}
}

interface Props {
	spells: CharacterSpell[];
	spell: CharacterSpellReference;
	character: PlayerCharacter;
	removeItem: () => void;
	updateItemProperty: (p: string, v: any) => void;
}

export class SpellEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const availableSpells = [];
		for (const spell of this.props.spells) {
			availableSpells.push(
				<option value={spell.id} key={spell.id}>
					{spell.name}
				</option>
			);
		}
		return (
			<div className={css.action}>
				<div className={css.button} onClick={this.props.removeItem}>
					<Icon path={mdiDelete} size={1} color={'#ccc'} />
				</div>
				<input
					type="checkbox"
					checked={this.props.spell.prepared}
					onChange={e =>
						this.props.updateItemProperty('prepared', e.currentTarget.checked)
					}
				/>
				<select
					value={this.props.spell.spellId}
					onChange={e => this.props.updateItemProperty('spellId', e.currentTarget.value)}
				>
					{' '}
					{availableSpells}{' '}
				</select>
			</div>
		);
	}
}
