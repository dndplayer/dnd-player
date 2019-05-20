import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.scss';
import { PlayerCharacter } from '../../../../models/Character';
import Rules from '../../../../5eRules';

interface Props {
	updateCharacterProperty: (property: string, value: any) => void;
	character: PlayerCharacter;
}

export default class SavesEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		return (
			<div className={css.row}>
				<span>Saving throws:</span>
				<SaveEditor prop="strength" {...this.props} />
				<SaveEditor prop="dexterity" {...this.props} />
				<SaveEditor prop="constitution" {...this.props} />
				<SaveEditor prop="intelligence" {...this.props} />
				<SaveEditor prop="wisdom" {...this.props} />
				<SaveEditor prop="charisma" {...this.props} />
			</div>
		);
	}
}

interface InnerProps {
	prop: string;
	character: PlayerCharacter;
	updateCharacterProperty: (property: string, value: any) => void;
}
class SaveEditor extends React.Component<InnerProps, {}> {
	render(): ReactNode {
		const { character, prop } = this.props;
		return (
			<div className={css.column}>
				<div>{Rules.getShortAbilityName(prop)}</div>
				<select
					value={(character.saves || {})[prop]}
					onChange={e => this.updateSaveProperty(e.target.value)}
				>
					<option value={0}>Not proficient</option>
					<option value={0.5}>Half proficient</option>
					<option value={1}>Proficient</option>
					<option value={2}>Expertise</option>
				</select>
			</div>
		);
	}

	updateSaveProperty(value): void {
		this.props.updateCharacterProperty('saves', {
			...this.props.character.saves,
			[this.props.prop]: value
		});
	}
}
