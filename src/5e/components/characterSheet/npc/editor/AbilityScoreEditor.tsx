import React, { ReactNode } from 'react';

import css from './NonPlayerCharacterSheetEditor.module.css';
import { Character } from '../../../../models/Character';
import Rules from '../../../../5eRules';

interface Props {
	ability: string;
	character: Character;
	updateCharacterProperty: (property: string, value: any) => void;
}

export default class AbilityScoreEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { ability, character } = this.props;

		return (
			<div className={css.ability}>
				<div className={css.abilityTitle}>{Rules.getShortAbilityName(ability)}</div>
				<input
					value={character[ability]}
					type="number"
					min={0}
					max={30}
					placeholder={'10'}
					onChange={e => this.props.updateCharacterProperty(ability, e.target.value)}
				/>
			</div>
		);
	}
}
