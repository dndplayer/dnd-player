import React, { ReactNode } from 'react';

import './PlayerCharacterSheet.css';
import { PlayerCharacter } from '../../../models/Character';
import InlineCalculator from '../../../../components/util/InlineCalculator';

interface Props {
	character: PlayerCharacter;
	updatePlayerCharacter: (characterId: string, character: PlayerCharacter) => void;
}

export default class HitPoints extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character } = this.props;

		return (
			<div className="hp">
				<div className="hp-title">Hit Points</div>
				<div className="hp-current">
					<InlineCalculator
						value={character.hp}
						onEnter={(val): void =>
							this.props.updatePlayerCharacter(character.id, {
								...character,
								hp: val
							})
						}
					/>
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
