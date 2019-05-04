import React, { ReactNode } from 'react';

import css from './NonPlayerCharacterSheetEditor.module.css';
import { NonPlayerCharacterTrait } from '../../../../models/Character';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';

interface Props {
	updateTraitProperty: (property: string, value: any) => void;
	trait: NonPlayerCharacterTrait;
	removeTrait: () => void;
}

export default class TraitEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { trait } = this.props;

		return (
			<div className={css.trait}>
				<div className={css.button} onClick={this.props.removeTrait}>
					<Icon path={mdiDelete} size={1} color={'#ccc'} />
				</div>
				<input
					className={css.italicHeading}
					value={trait.title}
					placeholder="Title"
					onChange={e => this.props.updateTraitProperty('title', e.target.value)}
				/>
				<textarea
					value={trait.description}
					placeholder="Description"
					onChange={e => this.props.updateTraitProperty('description', e.target.value)}
				/>
			</div>
		);
	}
}
