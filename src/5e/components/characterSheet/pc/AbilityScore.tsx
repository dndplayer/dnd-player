import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';

import css from './PlayerCharacterSheet.module.scss';
import { Character } from '../../../models/Character';
import Rules from '../../../5eRules';
import CharacterActionHelper from '../../../CharacterActionHelper';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	ability: string;
	character: Character;
}

export default class AbilityScore extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {};

		this.handleClick = this.handleClick.bind(this);
	}

	render(): ReactNode {
		const { ability, character } = this.props;
		const modifier = Rules.getAbilityModifier(character, ability);

		return (
			<div className={css.ability} onClick={(e): void => this.handleClick(e, 0)}>
				<div className={css.popupAdvantage} onClick={(e): void => this.handleClick(e, 1)}>
					A
				</div>
				<div
					className={css.popupDisadvantage}
					onClick={(e): void => this.handleClick(e, -1)}
				>
					D
				</div>
				<div className={css.abilityTitle}>{Rules.getLongAbilityName(ability)}</div>
				<div className={css.abilityModifier}>
					<div className={css.abilitySymbol}>{modifier < 0 ? '-' : '+'}</div>
					<div className={css.abilityNumber}>{Math.abs(modifier)}</div>
				</div>
				<div className={css.abilityScore}>{character[ability]}</div>
			</div>
		);
	}

	handleClick(e: React.MouseEvent, advantage: number): void {
		e.stopPropagation();

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
