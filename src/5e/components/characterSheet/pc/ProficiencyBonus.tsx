import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheet.module.scss';
import { PlayerCharacter } from '../../../models/Character';
import Rules from '../../../5eRules';

interface Props {
	character: PlayerCharacter;
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
			<div className={css.proficiency}>
				<div className={css.proficiencyTitle}>Proficiency</div>
				<div className={css.proficiencyModifier}>
					<div className={css.proficiencySymbol}>+</div>
					<div className={css.proficiencyNumber}>{modifier}</div>
				</div>
			</div>
		);
	}
}
