import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheet.module.scss';
import { PlayerCharacter } from '../../../models/Character';
import Rules from '../../../5eRules';
import { RollData, ChatMessageData } from '../../../../models/ChatMessage';
import { DiceRoll } from 'rpg-dice-roller';

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
			<div className={css.initiative} onClick={e => this.handleClick(e, 0)}>
				<div className={css.popupAdvantage} onClick={e => this.handleClick(e, 1)}>
					A
				</div>
				<div className={css.popupDisadvantage} onClick={e => this.handleClick(e, -1)}>
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

	handleClick(e, advantage: number): void {
		const modifier = Rules.getInitiativeModifier(this.props.character);
		const modifierStr = (modifier < 0 ? '' : '+') + modifier;
		const roll = new DiceRoll('d20' + modifierStr);

		const data: RollData = {
			pcId: this.props.character.id,
			npcTokenId: null,
			type: 'roll',
			rollType: 'Initiative',
			rollName: 'Initiative',
			modifier: modifierStr,
			roll1Total: roll.total,
			roll1Details: roll.toString().match(/.*?: (.*?) =/)[1],
			roll1CritSuccess: roll.rolls[0][0] === 20,
			roll1CritFail: roll.rolls[0][0] === 1
		};

		if (advantage) {
			const roll2 = new DiceRoll('d20' + modifierStr);
			data.rollAdvantageType = advantage;
			data.roll2Total = roll2.total;
			data.roll2Details = roll2.toString().match(/.*?: (.*?) =/)[1];
			data.roll2CritSuccess = roll2.rolls[0][0] === 20;
			data.roll2CritFail = roll2.rolls[0][0] === 1;
			e.stopPropagation();
		}

		this.props.sendMessage('', data);
	}
}
