import React, { ReactNode, ReactElement } from 'react';

import styles from './ChatDisplay.module.scss';
import './Roll.css';
import ChatMessageItem from './ChatMessageItem';
import RollMessageItem from './RollMessageItem';
import { ChatMessage, ChatMessageData } from '../../models/ChatMessage.js';
import CharacterAction from './characterActions/CharacterAction';

interface Props {
	recentMessages: ChatMessage[];
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updateTime: () => void;
	messagesOpen: boolean;
	user: firebase.User;
	currentTime: number;
}

export default class ChatDisplay extends React.Component<Props> {
	private scrollDiv: HTMLElement;

	componentDidUpdate(): void {
		this.scrollToBottomOfChat();
	}

	componentDidMount(): void {
		this.scrollToBottomOfChat();
	}

	scrollToBottomOfChat = (): void => {
		if (this.scrollDiv) {
			this.scrollDiv.scrollTop = this.scrollDiv.scrollHeight;
		}
	};

	render(): ReactNode {
		const { recentMessages, messagesOpen } = this.props;

		if (messagesOpen) {
			return null;
		}

		return (
			<div className={styles.chatContainer}>
				<div className={styles.messages} ref={cmpt => (this.scrollDiv = cmpt)}>
					{recentMessages.map(
						(x, idx): ReactElement => {
							switch (x.data && x.data.type) {
								case 'roll':
									return <RollMessageItem message={x} key={idx} />;
								case 'action':
									return <CharacterAction message={x} key={idx} />;
								default:
									return (
										<ChatMessageItem
											message={x}
											key={idx}
											styles={styles}
											isOwner={x.sender === this.props.user.email}
										/>
									);
							}
						}
					)}
				</div>
			</div>
		);
	}
}
