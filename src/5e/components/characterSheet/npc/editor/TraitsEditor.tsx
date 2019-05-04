import React, { ReactNode } from 'react';

import css from './NonPlayerCharacterSheetEditor.module.css';
import { NonPlayerCharacter } from '../../../../models/Character';
import TraitEditor from './TraitEditor';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';

interface Props {
	character: NonPlayerCharacter;
	updateCharacterProperty: (property: string, value: any) => void;
}

export default class TraitsEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character } = this.props;

		const traits = [];
		for (const traitIdx in character.traits) {
			const idx = traitIdx;
			const trait = character.traits[idx];
			traits.push(
				<TraitEditor
					key={idx}
					trait={trait}
					updateTraitProperty={(p, v) => this.updateTraitProperty(idx, p, v)}
					removeTrait={() => this.removeTrait(idx)}
				/>
			);
		}

		return (
			<div className="column">
				<span className={css.subheading}>Traits</span>
				<div className={`${css.column} ${css.center}`}>
					{traits}
					<div className={css.button} onClick={() => this.addTrait()}>
						<Icon path={mdiPlus} size={1} color={'#ccc'} />
					</div>
				</div>
			</div>
		);
	}

	updateTraitProperty(traitIdx: string, property: string, value: any): void {
		const newTraits = [...this.props.character.traits];
		newTraits[traitIdx][property] = value;
		this.props.updateCharacterProperty('traits', newTraits);
	}

	removeTrait(traitIdx: string): void {
		const newTraits = [...this.props.character.traits];
		newTraits.splice(parseInt(traitIdx), 1);
		this.props.updateCharacterProperty('traits', newTraits);
	}

	addTrait(): void {
		this.props.updateCharacterProperty('traits', [
			...(this.props.character.traits || []),
			{ title: '', description: '' }
		]);
	}
}
