import React, { ReactNode } from 'react';

import './CharacterSheet.css';
import { Character } from '../../models/Character';
import Rules from '../../5eRules';
import { RollData, ChatMessageData } from '../../../models/ChatMessage';
import { DiceRoll } from 'rpg-dice-roller';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	character: Character;
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
			<div className="initiative" onClick={e => this.handleClick(e, 0)}>
				<div className="popup-advantage" onClick={e => this.handleClick(e, 1)}>
					A
				</div>
				<div className="popup-disadvantage" onClick={e => this.handleClick(e, -1)}>
					D
				</div>
				<div className="initiative-title">Initiative</div>
				<div className="initiative-modifier">
					<div className="initiative-symbol">{modifier < 0 ? '-' : '+'}</div>
					<div className="initiative-number">{Math.abs(modifier)}</div>
				</div>
			</div>
		);
	}

	handleClick(e, advantage: number): void {
		const modifier = Rules.getInitiativeModifier(this.props.character);
		const modifierStr = (modifier < 0 ? '' : '+') + modifier;
		const roll = new DiceRoll('d20' + modifierStr);

		const data: RollData = {
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
