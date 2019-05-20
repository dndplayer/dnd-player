import React, { ReactNode } from 'react';

import { PlayerCharacter } from '../../../../models/Character';

interface Props {
	prop: string;
	character: PlayerCharacter;
	updateCharacterProperty: (property: string, value: any) => void;
}
export default class SaveEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character, prop } = this.props;
		return (
			<select
				value={(character.saves || {})[prop]}
				onChange={e => this.updateSaveProperty(e.target.value)}
			>
				<option value={0}>Not proficient</option>
				<option value={0.5}>Half proficient</option>
				<option value={1}>Proficient</option>
				<option value={2}>Expertise</option>
			</select>
		);
	}

	updateSaveProperty(value): void {
		this.props.updateCharacterProperty('saves', {
			...this.props.character.saves,
			[this.props.prop]: value
		});
	}
}
