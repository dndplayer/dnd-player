import React, { ReactNode } from 'react';
import { ChatMessage } from '../../models/ChatMessage';

interface Props {
	message: ChatMessage;
	isOwner: boolean;
	styles: any;
}
export default class ChatMessageItem extends React.Component<Props> {
	render(): ReactNode {
		const { message, styles } = this.props;
		const username = message.sender || 'unknown';
		let tokens = (message.msg || '').split(/\s/);

		const contents = tokens.map((token, i) => {
			let hasSpace = i !== tokens.length - 1;
			let maybeSpace = hasSpace ? ' ' : '';

			if (token.match(/^https?\:\//)) {
				return (
					<a key={i} href={token} target="_blank">
						{token}
						{maybeSpace}
					</a>
				);
			} else {
				return token + maybeSpace;
			}
		});

		return (
			<div className={styles.message} key={message.id}>
				<div className={styles.username}>{username} :</div>
				<div>{contents}</div>
			</div>
		);
	}
}
