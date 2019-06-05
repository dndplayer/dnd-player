import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheet.module.scss';
import { Character } from '../../../models/Character';
import Rules from '../../../5eRules';
import Rollable from '../../Rollable';
import CharacterActionHelper from '../../../CharacterActionHelper';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	ability: string;
	character: Character;
}

export default class AbilityScore extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	render(): ReactNode {
		const { ability, character } = this.props;
		const modifier = Rules.getAbilityModifier(character, ability);

		return (
			<div className={css.ability}>
				<div className={css.abilityTitle}>{Rules.getShortAbilityName(ability)}</div>
				<Rollable onClick={this.handleClick} showAdvantage>
					{`${character[ability]} (${modifier >= 0 ? `+${modifier}` : modifier})`}
				</Rollable>
			</div>
		);
	}

	handleClick(advantage: number): void {
		CharacterActionHelper.doBasicRoll(
			this.props.character,
			'Ability Check',
			Rules.getLongAbilityName(this.props.ability),
			Rules.getAbilityModifier(this.props.character, this.props.ability),
			advantage,
			this.props.sendMessage
		);
	}
}
