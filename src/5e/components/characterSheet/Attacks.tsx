import React, { ReactNode } from 'react';

import './Attacks.css';
import { Character } from '../../models/Character';
import Rules from '../../5eRules';
import AttackBlock from './AttackBlock';
import { ChatMessageData } from '../../../models/ChatMessage';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	character: Character;
}

export default class Attacks extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	render(): ReactNode {
		const { character } = this.props;

		const attacks = Rules.getAttacks(character).map(attack => (
			<AttackBlock key={attack.name} attack={attack} {...this.props} />
		));

		return (
			<div className="attacks">
				<div className="attack-container">
					<div className="attack-header">
						<span className="attack-name">Attack</span>
						<span className="attack-range">Range</span>
						<span className="attack-toHit">To Hit</span>
						<span className="attack-damage">Damage</span>
					</div>
					{attacks}
				</div>
				<div className="attacks-title">Attacks</div>
			</div>
		);
	}
}
