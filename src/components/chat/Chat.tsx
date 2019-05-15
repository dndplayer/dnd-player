import React, { ReactNode, ReactElement, SyntheticEvent } from 'react';

import { DiceRoll } from 'rpg-dice-roller';

import styles from './Chat.module.scss';
import './Roll.css';
import ChatMessageItem from './ChatMessageItem';
import RollMessageItem from './RollMessageItem';
import { ChatMessage, ChatMessageData, RollData } from '../../models/ChatMessage.js';
import CharacterAction from './characterActions/CharacterAction';
import { HotKeys, ObserveKeys } from 'react-hotkeys';
import { CSSTransition } from 'react-transition-group';

interface Props {
	messages: ChatMessage[];
	sendMessage: (message: string, data?: ChatMessageData) => void;
	login: (username: string, password: string) => void;
	loggedIn: boolean;
	user: firebase.User;
	messagesOpen: boolean;
	closeChat: () => void;
}
interface State {
	msg: string;
}
export default class Chat extends React.Component<Props, State> {
	state = {
		msg: ''
	};

	private scrollDiv: HTMLElement;

	keyMap = {
		SEND_MESSAGE: 'enter',
		CLOSE_CHAT: 'esc'
	};

	handlers = {
		SEND_MESSAGE: event => this.handleEnter(),
		CLOSE_CHAT: event => this.props.closeChat()
	};

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

		return (
			<CSSTransition
				in={messagesOpen}
				unmountOnExit
				timeout={200}
				classNames={{
					enter: styles.enter,
					enterActive: styles.enterActive,
					exit: styles.exit,
					exitActive: styles.exitActive
				}}
			>
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
												isOwner={x.sender === this.props.user.email}
											/>
										);
								}
							}
						)}
					</div>
					<HotKeys keyMap={this.keyMap} handlers={this.handlers}>
						<ObserveKeys only={undefined} except={undefined}>
							<input
								onChange={e => this.handleMsgChange(e)}
								autoFocus
								disabled={!messagesOpen}
								value={this.state.msg}
							/>
						</ObserveKeys>
					</HotKeys>
				</div>
			</CSSTransition>
		);
	}

	handleMsgChange = (e): void => {
		this.setState({ msg: e.target.value });
	};

	handleEnter = (): void => {
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
