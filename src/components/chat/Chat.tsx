import React, { ReactNode, ReactElement } from 'react';
import Button from '@material-ui/core/Button';

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import FirebaseConfig from '../../firebase-config.json';
import { DiceRoll } from 'rpg-dice-roller';

import styles from './Chat.module.css';
import './Roll.css';
import ChatMessageItem from './ChatMessageItem';
import RollMessageItem from './RollMessageItem';
import { ChatMessage, ChatMessageData, RollData } from '../../models/ChatMessage.js';
import Authentication from '../authentication/Authentication';

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
}
export default class Chat extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			msg: '',
			messages: []
		};

		this.handleRollClick = this.handleRollClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleMsgChange = this.handleMsgChange.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
	}

	private scrollDiv: HTMLElement;

	componentDidUpdate(): void {
		if (this.scrollDiv) {
			// this.scrollDiv.scrollIntoView({ behavior: 'smooth' });
			this.scrollDiv.scrollTop = this.scrollDiv.scrollHeight;
		}
	}

	render(): ReactNode {
		const { messages } = this.props;

		return (
			<div>
				{!this.props.loggedIn ? (
					<Authentication />
				) : (
					<div
						style={
							{
								// display: 'flex',
								// flexDirection: 'column',
								// justifyContent: 'start-flex'
							}
						}
					>
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
								<input
									className={styles.chatinput}
									placeholder="msg or d20+4 etc"
									onChange={this.handleMsgChange}
									onKeyDown={this.handleKeyDown}
									value={this.state.msg}
								/>
								<Button
									// className={styles.rollButton}
									variant="contained"
									color="primary"
									onClick={this.handleRollClick}
								>
									Roll something
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}

	handleRollClick(e): void {
		const modifier = Math.round(Math.random() * 10 - 5);
		const modifierStr = (modifier < 0 ? '' : '+') + modifier;
		const roll = new DiceRoll('d20' + modifierStr);
		const skills = [
			'Athletics',
			'Acrobatics',
			'Sleight of Hand',
			'Stealth',
			'Arcana',
			'History',
			'Investigation',
			'Nature',
			'Religion',
			'Animal Handling',
			'Insight',
			'Medicine',
			'Perception',
			'Survival',
			'Deception',
			'Intimidation',
			'Performance',
			'Persuasion'
		];
		const skill = skills[Math.floor(Math.random() * skills.length)];

		const data: RollData = {
			type: 'roll',
			rollType: 'Skill',
			rollName: skill,
			modifier: modifierStr,
			roll1Total: roll.total,
			roll1Details: roll.toString().match(/.*?: (.*?) =/)[1],
			roll1CritSuccess: false, // XXX
			roll1CritFail: false // XXX
		};
		this.props.sendMessage('', data);
	}

	handleMsgChange(e): void {
		this.setState({ msg: e.target.value });
	}

	handleKeyDown(e): void {
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
	}

	sendMessage(msg: string): void {
		this.props.sendMessage(msg);
	}
}
