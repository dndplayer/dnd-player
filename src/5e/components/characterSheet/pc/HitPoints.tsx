import React, { ReactNode } from 'react';

import './PlayerCharacterSheet.css';
import { PlayerCharacter } from '../../../models/Character';

interface Props {
	character: PlayerCharacter;
}

export default class HitPoints extends React.Component<Props, {}> {
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
