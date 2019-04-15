import React, { ReactNode, ReactElement } from 'react';

import { DiceRoll } from 'rpg-dice-roller';
import { RollData, ChatMessageData } from '../../models/ChatMessage';

import './CharacterSheet.css';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	ability: string;
	score: number;
}
interface State {}

export default class CharacterSheet extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};

		this.handleClick = this.handleClick.bind(this);
	}

	// private chatRoom: firebase.firestore.CollectionReference;

	// private cleanup: () => void;

	render(): ReactNode {
		const { ability, score } = this.props;
		const modifier = this.getAbilityModifier(score);

		return (
			<div className="stat" onClick={this.handleClick}>
				<div className="title">{ability}</div>
				<div className="modifier">
					<div className="symbol">{modifier < 0 ? '-' : '+'}</div>
					<div className="number">{Math.abs(modifier)}</div>
				</div>
				<div className="points">{score}</div>
			</div>
		);
	}

	componentDidMount(): void {}
	componentWillUnmount(): void {}

	getAbilityModifier(score: number): number {
		return Math.floor((score - 10) / 2);
	}

	handleClick(e): void {
		const modifier = this.getAbilityModifier(this.props.score);
		const modifierStr = (modifier < 0 ? '' : '+') + modifier;
		const roll = new DiceRoll('d20' + modifierStr);
		const stat = this.props.ability;

		const data: RollData = {
			type: 'roll',
			rollType: 'Ability',
			rollName: stat,
			modifier: modifierStr,
			roll1Total: roll.total,
			roll1Details: roll.toString().match(/.*?: (.*?) =/)[1]
		};
		this.props.sendMessage('', data);
	}
}
