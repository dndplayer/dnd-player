import React, { ReactNode } from 'react';
import { ChatMessage } from '../../models/ChatMessage';

import styles from './Chat.module.css';

interface Props {
	message: ChatMessage;
	isOwner: boolean;
}
export default class ChatMessageItem extends React.Component<Props> {
	render(): ReactNode {
		const { message, isOwner } = this.props;
		const username = message.sender || 'unknown';

		return (
			<div className="message" key={message.id}>
				<div className={styles.username}>{username} :</div>
				<div>{message.msg}</div>
			</div>
		);
	}
}
