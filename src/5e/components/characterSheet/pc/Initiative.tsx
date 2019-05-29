import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheet.module.scss';
import { PlayerCharacter } from '../../../models/Character';
import Rules from '../../../5eRules';
import { ChatMessageData } from '../../../../models/ChatMessage';
import CharacterActionHelper from '../../../CharacterActionHelper';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	character: PlayerCharacter;
}

export default class Initiative extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {};
		this.handleClick = this.handleClick.bind(this);
	}

	render(): ReactNode {
		const { character } = this.props;
		const modifier = Rules.getInitiativeModifier(character);

		return (
			<div className={css.initiative} onClick={(e): void => this.handleClick(e, 0)}>
				<div className={css.popupAdvantage} onClick={(e): void => this.handleClick(e, 1)}>
					A
				</div>
				<div
					className={css.popupDisadvantage}
					onClick={(e): void => this.handleClick(e, -1)}
				>
					D
				</div>
				<div className={css.initiativeTitle}>Initiative</div>
				<div className={css.initiativeModifier}>
					<div className={css.initiativeSymbol}>{modifier < 0 ? '-' : '+'}</div>
					<div className={css.initiativeNumber}>{Math.abs(modifier)}</div>
				</div>
			</div>
		);
	}

	handleClick(e: React.MouseEvent, advantage: number): void {
		e.stopPropagation();

		CharacterActionHelper.doBasicRoll(
			this.props.character,
			'Initiative',
			'Initiative',
			Rules.getInitiativeModifier(this.props.character),
			advantage,
			this.props.sendMessage
		);
	}
}
