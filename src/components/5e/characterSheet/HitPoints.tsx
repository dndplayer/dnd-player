import React, { ReactNode, ReactElement } from 'react';

import './CharacterSheet.css';
import { Character } from '../Character';

interface Props {
	character: Character;
}
interface State {}

export default class HitPoints extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	// private chatRoom: firebase.firestore.CollectionReference;

	// private cleanup: () => void;

	render(): ReactNode {
		const { character } = this.props;

		return (
			<div className="hp">
				<div className="hp-title">Hit Points</div>
				<div className="hp-current">
					<span>{character.hp}</span>
					<span className="hp-header">Current</span>
				</div>
				<div className="hp-divider">/</div>
				<div className="hp-max">
					<span>{character.maxHp}</span>
					<span className="hp-header">Max</span>
				</div>
			</div>
		);
	}

	componentDidMount(): void {}
	componentWillUnmount(): void {}
}
