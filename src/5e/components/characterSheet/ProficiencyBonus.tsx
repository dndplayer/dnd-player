import React, { ReactNode } from 'react';

import './CharacterSheet.css';
import { Character } from '../../models/Character';
import Rules from '../../5eRules';

interface Props {
	character: Character;
}

export default class ProficiencyBonus extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	render(): ReactNode {
		const { character } = this.props;
		const modifier = Rules.getProficiencyBonus(character);

		return (
			<div className="proficiency">
				<div className="proficiency-title">Proficiency</div>
				<div className="proficiency-modifier">
					<div className="proficiency-symbol">+</div>
					<div className="proficiency-number">{modifier}</div>
				</div>
			</div>
		);
	}
}
