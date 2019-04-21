import React, { ReactNode, ReactElement } from 'react';

import './CharacterSheet.css';
import { Attack } from '../5eRules';
import Rules from '../5eRules';
import { RollData, ChatMessageData } from '../../../models/ChatMessage';
import { DiceRoll } from 'rpg-dice-roller';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	attack: Attack;
}
interface State {}

export default class AttackBlock extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};
		this.handleClick = this.handleClick.bind(this);
	}

	// private chatRoom: firebase.firestore.CollectionReference;

	// private cleanup: () => void;

	render(): ReactNode {
		const { attack } = this.props;

		return (
			<div className="attack" onClick={e => this.handleClick(e, 0)}>
				<div className="popup-advantage" onClick={e => this.handleClick(e, 1)}>
					A
				</div>
				<div className="popup-disadvantage" onClick={e => this.handleClick(e, -1)}>
					D
				</div>
				<div className="attack-name">
					<span>{attack.name}</span>
				</div>
				<div className="attack-range">{attack.range} ft.</div>
				<div className="attack-toHit">
					<div className="attack-toHit-symbol">{attack.toHit < 0 ? '-' : '+'}</div>
					<div className="attack-toHit-number">{Math.abs(attack.toHit)}</div>
				</div>
				<div className="attack-damage">
					{attack.diceCount}d{attack.diceType}+{attack.damageBonus || 0}{' '}
					{attack.damageType}
				</div>
				<div className="attack-notes">Notes</div>
			</div>
		);
	}

	componentDidMount(): void {}
	componentWillUnmount(): void {}

	handleClick(e, advantage: number): void {
		const attack = this.props.attack;
		const modifier = attack.toHit;
		const modifierStr = (modifier < 0 ? '' : '+') + modifier;
		const roll = new DiceRoll('d20' + modifierStr);

		const data: RollData = {
			type: 'roll',
			rollType: 'Attack',
			rollName: `${attack.diceCount}d${attack.diceType} ${this.props.attack.name}`,
			rollSuffix: 'to hit',
			modifier: modifierStr,
			roll1Total: roll.total,
			roll1Details: roll.toString().match(/.*?: (.*?) =/)[1],
			roll1CritSuccess: roll.rolls[0][0] === (attack.critRange || 20),
			roll1CritFail: roll.rolls[0][0] === 1
		};

		if (advantage) {
			const roll2 = new DiceRoll('d20' + modifierStr);
			data.rollAdvantageType = advantage;
			data.roll2Total = roll2.total;
			data.roll2Details = roll2.toString().match(/.*?: (.*?) =/)[1];
			data.roll2CritSuccess = roll2.rolls[0][0] === (attack.critRange || 20);
			data.roll2CritFail = roll2.rolls[0][0] === 1;
			e.stopPropagation();
		}

		const crit =
			advantage >= 0
				? data.roll1CritSuccess || data.roll2CritSuccess
				: data.roll1CritSuccess && data.roll2CritSuccess;

		const damageRoll = new DiceRoll(
			`${attack.diceCount * (crit ? 2 : 1)}d${attack.diceType}+${attack.damageBonus}`
		);
		data.damageRollTotal = damageRoll.total;
		data.damageRollDetails = damageRoll.toString().match(/.*?: (.*?) =/)[1];
		data.damageRollSuffix = attack.damageType;

		this.props.sendMessage('', data);
	}
}
