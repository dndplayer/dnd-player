import React, { ReactNode } from 'react';
import {
	ChatMessage,
	CharacterActionData,
	CharacterActionResultType,
	CharacterActionDiceRollResult,
	CharacterActionTextResult
} from '../../../models/ChatMessage';
import DiceRoll from './DiceRoll';
import TextBlock from './TextBlock';

interface Props {
	message: ChatMessage;
}

export default class CharacterAction extends React.Component<Props> {
	render(): ReactNode {
		const { message } = this.props;
		const data = message.data as CharacterActionData;

		const details = [];
		for (const idx in data.results) {
			const result = data.results[idx];
			switch (result.type) {
				case CharacterActionResultType.Text:
					details.push(
						<TextBlock key={idx} result={result as CharacterActionTextResult} />
					);
					break;
				case CharacterActionResultType.DiceRoll:
					details.push(
						<DiceRoll key={idx} result={result as CharacterActionDiceRollResult} />
					);
					break;
				default:
					throw new Error(`Unknown result type ${result.type}.`);
			}
		}

		return (
			<div className={`character-action-container`}>
				<div className="action-header">
					<span className="action-user">{message.sender}</span>
				</div>
				<div className="action-title">
					<span className="action-name">{data.title}</span>
				</div>
				{details}
			</div>
		);
	}
}
