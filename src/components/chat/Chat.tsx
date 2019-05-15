import React, { ReactNode, ReactElement } from 'react';

import { DiceRoll } from 'rpg-dice-roller';

import styles from './Chat.module.scss';
import './Roll.css';
import ChatMessageItem from './ChatMessageItem';
import RollMessageItem from './RollMessageItem';
import { ChatMessage, ChatMessageData, RollData } from '../../models/ChatMessage.js';
import CharacterAction from './characterActions/CharacterAction';
import { HotKeys, ObserveKeys } from 'react-hotkeys';

interface Props {
	messages: ChatMessage[];
	sendMessage: (message: string, data?: ChatMessageData) => void;
	user: firebase.User;
	messagesOpen: boolean;
	closeChat: () => void;
	openChat: () => void;
}
interface State {
	msg: string;
}
export default class Chat extends React.Component<Props, State> {
	state = {
		msg: ''
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
		const { messages, messagesOpen } = this.props;
		if (!messagesOpen) {
			return null;
		}

		return (
			<div className={styles.chatContainer}>
				<div className={styles.messages} ref={cmpt => (this.scrollDiv = cmpt)}>
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
											styles={styles}
											isOwner={x.sender === this.props.user.email}
										/>
									);
							}
						}
					)}
				</div>
				<input
					onChange={e => this.handleMsgChange(e)}
					onKeyDown={e => this.handleEnter(e)}
					autoFocus
					disabled={!messagesOpen}
					value={this.state.msg}
				/>
			</div>
		);
	}

	handleMsgChange = (e): void => {
		this.setState({ msg: e.target.value });
	};

	handleEnter = (e: React.KeyboardEvent): void => {
		if (e.keyCode === 27) {
			// esc
			this.props.closeChat();
			return;
		}

		if (e.keyCode !== 13) {
			// enter
			return;
		}

		if (!this.props.messagesOpen) {
			this.props.openChat();
			return;
		}

		if (!this.state.msg) {
			return;
		}

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
	};

	sendMessage = (msg: string): void => {
		this.props.sendMessage(msg);
	};
}
