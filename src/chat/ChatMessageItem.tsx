import React, { ReactNode } from 'react';
import ChatMessage from '../models/ChatMessage';

interface Props {
	message: ChatMessage;
	isOwner: boolean;
}
export default class ChatMessageItem extends React.Component<Props> {
	render(): ReactNode {
		const { message, isOwner } = this.props;

		if (isOwner)
			return (
				<div className="message" key={message.id}>
					<span id="me">{message.sender} :</span>
					<br />
					{message.msg}
				</div>
			);
		return (
			<div className="message" key={message.id}>
				<span id="sender">{message.sender} :</span>
				<br />
				{message.msg}
			</div>
		);
	}
}
