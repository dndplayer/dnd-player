import React, { ReactNode, ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { DiceRoll } from 'rpg-dice-roller';

import styles from './Chat.module.css';
import './Roll.css';
import ChatMessageItem from './ChatMessageItem';
import RollMessageItem from './RollMessageItem';
import { ChatMessage, ChatMessageData, RollData } from '../../models/ChatMessage.js';
import Authentication from '../authentication/Authentication';
import CharacterAction from './characterActions/CharacterAction';
import WindowPortal from '../util/WindowPortal';
import { Icon, Fab } from '@material-ui/core';

interface Props {
	messages: ChatMessage[];
	sendMessage: (message: string, data?: ChatMessageData) => void;
	login: (username: string, password: string) => void;
	loggedIn: boolean;
	user: firebase.User;
	testButton: () => void;
}
interface State {
	msg: string;
	messages: ChatMessage[];
}
export default class Chat extends React.Component<Props, State> {
	state = {
		msg: '',
		messages: []
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

		return (
			<div style={{ padding: '0 10px 10px 10px' }}>
				{!this.props.loggedIn ? (
					<Authentication />
				) : (
					<div>
						<div style={{ paddingBottom: '15px' }}>
							<Authentication />
						</div>
						<h1 className={styles.chatHeader}>Chat</h1>
						<div className={styles.messageWrapper}>
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
							<div className={styles.chatInputWrapper}>
								<TextField
									placeholder="msg or d20+4 etc"
									onChange={e => this.handleMsgChange(e)}
									onKeyDown={e => this.handleKeyDown(e)}
									value={this.state.msg}
									variant="filled"
									margin="normal"
								/>
								{/* <Button onClick={() => this.props.testButton()}>TEST</Button> */}
							</div>
						</div>
					</div>
				)}
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
