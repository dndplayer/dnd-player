import React, { ReactNode } from 'react';
import { ChatMessage, RollData } from '../../models/ChatMessage';

interface Props {
	message: ChatMessage;
}
export default class RollMessageItem extends React.Component<Props> {
	render(): ReactNode {
		const { message } = this.props;
		const data = message.data as RollData;

		return (
			<div className="roll-container roll-skill">
				<div className="roll-header">
					<span className="roll-user">{message.sender}</span>
					<span className="roll-type">{data.rollType}</span>
				</div>
				<div className="roll-title">
					<span className="roll-name">{data.rollName}</span>
					<span className="roll-modifier">({data.modifier})</span>
				</div>
				<div className="roll-rolls">
					<div className="roll-1">
						<span className="summary">{data.roll1Total}</span>
						<span className="details">{data.roll1Details}</span>
					</div>
					{data.roll2Details && (
						<div className="roll-2 ignore">
							<span className="summary">16</span>
							<span className="details">[12]+4</span>
						</div>
					)}
				</div>
			</div>
		);
	}
}