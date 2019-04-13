import React, { ReactNode } from 'react';
import ChatMessage from '../../models/ChatMessage';

interface Props {
	message: ChatMessage;
	isOwner: boolean;
}
export default class ChatMessageItem extends React.Component<Props> {
	render(): ReactNode {
		const { message, isOwner } = this.props;
		const username = message.sender || 'unknown';

		if (isOwner)
			return (
				<div className="message" key={message.id}>
					<div id="me">{username} :</div>
					<div>{message.msg}</div>
				</div>
			);
		return (
			<div className="message" key={message.id}>
				<div id="sender">{username} :</div>
				<div>{message.msg}</div>
			</div>
		);
	}
}
