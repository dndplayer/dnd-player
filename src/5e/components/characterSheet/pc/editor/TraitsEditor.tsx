import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.scss';
import { CharacterTrait } from '../../../../models/Character';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import ArrayEditor from './ArrayEditor';

export default class TraitsEditor extends ArrayEditor<CharacterTrait> {
	prop = 'traits';
	heading = 'Traits';

	mapItem(idx: string, item: CharacterTrait): React.ReactNode {
		return (
			<TraitEditor
				key={idx}
				trait={item}
				updateTraitProperty={(p, v) => this.updateItemProperty(idx, p, v)}
				removeTrait={() => this.removeItem(idx)}
			/>
		);
	}
}

interface Props {
	updateTraitProperty: (property: string, value: any) => void;
	trait: CharacterTrait;
	removeTrait: () => void;
}

export class TraitEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { trait } = this.props;

		return (
			<div className={css.trait}>
				<div
					className={css.button}
					onClick={this.props.removeTrait}
					style={{ background: '#333' }}
				>
					<Icon path={mdiDelete} size={1} color={'#ccc'} />
				</div>
				<input
					value={trait.name}
					onChange={e => this.props.updateTraitProperty('name', e.target.value)}
				/>
				<textarea
					value={trait.description}
					onChange={e => this.props.updateTraitProperty('description', e.target.value)}
				/>
			</div>
		);
	}
}
