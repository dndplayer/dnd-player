import React, { ReactNode } from 'react';
import { CharacterActionDiceRollResult, AdvantageType } from '../../../models/ChatMessage';
import css from './CharacterAction.module.scss';

interface Props {
	result: CharacterActionDiceRollResult;
}

export default class DiceRoll extends React.Component<Props> {
	render(): ReactNode {
		const { result } = this.props;

		const rolls = [];
		let i = 0;
		for (const roll of result.rolls) {
			rolls.push(
				<div key={i++} className={`${css.roll} ${roll.ignore ? 'ignore' : ''}`}>
					<span
						className={
							'summary ' +
							(roll.critSuccess ? 'crit' : roll.critFail ? 'critFail' : '')
						}
					>
						<span className="roll-total">{roll.total}</span>
						<span className="roll-suffix" style={{ paddingLeft: '2px' }}>
							{roll.suffix}
						</span>
					</span>
					<span className="details">{roll.details}</span>
				</div>
			);

			if (result.advantage && roll != result.rolls[result.rolls.length - 1]) {
				rolls.push(
					<div
						key={i++}
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
