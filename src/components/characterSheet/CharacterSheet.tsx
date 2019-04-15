import React, { ReactNode, ReactElement } from 'react';

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import FirebaseConfig from '../../firebase-config.json';

import { DiceRoll } from 'rpg-dice-roller';
import { RollData, ChatMessageData } from '../../models/ChatMessage';
import AbilityScore from './AbilityScore';

import './CharacterSheet.css';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
}
interface State {}

export default class CharacterSheet extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	// private chatRoom: firebase.firestore.CollectionReference;

	// private cleanup: () => void;

	render(): ReactNode {
		const {} = this.props;

		const character = {
			name: 'Aaron Duckbill',
			size: 'M',
			str: 25,
			dex: 13,
			con: 16,
			int: 8,
			wis: 12,
			cha: 10
		};

		return (
			<div className="stat-container">
				<AbilityScore ability="Strength" score={character.str} {...this.props} />
				<AbilityScore ability="Dexterity" score={character.dex} {...this.props} />
				<AbilityScore ability="Constitution" score={character.con} {...this.props} />
				<AbilityScore ability="Intelligence" score={character.int} {...this.props} />
				<AbilityScore ability="Wisdom" score={character.wis} {...this.props} />
				<AbilityScore ability="Charisma" score={character.cha} {...this.props} />
			</div>
		);
	}

	componentDidMount(): void {}
	componentWillUnmount(): void {}
}
