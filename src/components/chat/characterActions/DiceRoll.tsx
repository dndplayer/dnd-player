import React, { ReactNode } from 'react';
import { CharacterActionDiceRollResult, AdvantageType } from '../../../models/ChatMessage';

interface Props {
	result: CharacterActionDiceRollResult;
}

export default class DiceRoll extends React.Component<Props> {
	render(): ReactNode {
		const { result } = this.props;

		const rolls = [];
		for (const roll of result.rolls) {
			rolls.push(
				<div className={`roll ${roll.ignore ? 'ignore' : ''}`}>
					<span
						className={
							'summary ' +
							(roll.critSuccess ? 'crit' : roll.critFail ? 'critFail' : '')
						}
					>
						<span className="roll-total">{roll.total}</span>
					</span>
					<span className="details">{roll.details}</span>
				</div>
			);

			if (result.advantage) {
				rolls.push(
					<div
						className={
							result.advantage === AdvantageType.Advantage
								? 'roll-advantage'
								: 'roll-disadvantage'
						}
					>
						{result.advantage === AdvantageType.Advantage ? 'A' : 'D'}
					</div>
				);
			}
		}

		return <div className={`roll-rolls`}>{rolls}</div>;
	}
}
