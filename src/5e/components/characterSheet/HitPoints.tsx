import React, { ReactNode } from 'react';

import './CharacterSheet.css';
import { Character } from '../../models/Character';

interface Props {
	character: Character;
}

export default class HitPoints extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

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
}
