import React, { ReactNode, ReactElement, SyntheticEvent } from 'react';

import { DiceRoll } from 'rpg-dice-roller';

import styles from './Chat.module.scss';
import './Roll.css';
import ChatMessageItem from './ChatMessageItem';
import RollMessageItem from './RollMessageItem';
import { ChatMessage, ChatMessageData, RollData } from '../../models/ChatMessage.js';
import CharacterAction from './characterActions/CharacterAction';

interface Props {
	messages: ChatMessage[];
	sendMessage: (message: string, data?: ChatMessageData) => void;
	login: (username: string, password: string) => void;
	loggedIn: boolean;
	user: firebase.User;
}
interface State {
	msg: string;
	messages: ChatMessage[];
	messagesOpen: boolean;
}
export default class Chat extends React.Component<Props, State> {
	state = {
		msg: '',
		messages: [],
		messagesOpen: true
	};

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
		const { messages } = this.props;
		const { messagesOpen } = this.state;
		if (!messagesOpen) {
			return null;
		}

		return (
			<div className={styles.chatContainer} ref={cmpt => (this.scrollDiv = cmpt)}>
				<div className={styles.messages}>
					{messages.map(
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
											isOwner={x.sender === this.props.user.email}
										/>
									);
							}
						}
					)}
				</div>
				<div>
					<input
						onChange={e => this.handleMsgChange(e)}
						onKeyDown={e => this.handleKeyDown(e)}
						autoFocus
						value={this.state.msg}
					/>
				</div>
			</div>
		);
	}

	handleMsgChange = (e): void => {
		this.setState({ msg: e.target.value });
	};

	handleKeyDown = (e): void => {
		if (e.key === 'Enter') {
			if (this.state.msg.match(/^\d*?d(\d+|%)/)) {
				const roll = new DiceRoll(this.state.msg);
				const data: RollData = {
					type: 'roll',
					rollType: 'Ad-hoc',
					rollName: roll.notation,
					modifier: null,
					roll1Total: roll.total,
					roll1Details: roll.toString().match(/.*?: (.*?) =/)[1],
					roll1CritSuccess: false, // XXX
					roll1CritFail: false // XXX
				};
				this.props.sendMessage('', data);
			} else {
				this.sendMessage(this.state.msg);
			}
			this.setState({ msg: '' });
		}
	};

	sendMessage = (msg: string): void => {
		this.props.sendMessage(msg);
	};
}
