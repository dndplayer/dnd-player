import React, { ReactNode } from 'react';
import { ChatMessage } from '../../models/ChatMessage';

interface Props {
	message: ChatMessage;
	isOwner: boolean;
	styles: any;
}
export default class ChatMessageItem extends React.Component<Props> {
	render(): ReactNode {
		const { message, isOwner, styles } = this.props;
		const username = message.sender || 'unknown';

		return (
			<div className={styles.message} key={message.id}>
				<div className={styles.username}>{username} :</div>
				<div>{message.msg}</div>
			</div>
		);
	}
}
