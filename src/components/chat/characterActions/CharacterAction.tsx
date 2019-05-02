import React, { ReactNode } from 'react';
import { ChatMessage, CharacterActionData } from '../../../models/ChatMessage';
import Result from './Result';

interface Props {
	message: ChatMessage;
}

export default class CharacterAction extends React.Component<Props> {
	render(): ReactNode {
		const { message } = this.props;
		const data = message.data as CharacterActionData;

		const results = [];
		for (const idx in data.results) {
			const result = data.results[idx];
			results.push(<Result key={idx} action={result} />);
		}

		return (
			<div className={`character-action-container`}>
				<div className="action-header">
					<span className="action-user">{data.characterName || message.sender}</span>
				</div>
				<div className="action-title">
					<span className="action-name">{data.title}</span>
				</div>
				{data.results.map((x, i) => (
					<Result key={i} action={x} />
				))}
			</div>
		);
	}
}
