import React, { ReactNode, ReactElement } from 'react';

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import FirebaseConfig from '../../firebase-config.json';
import { DiceRoller, DiceRoll } from 'rpg-dice-roller';

import './Chat.css';
import ChatMessageItem from './ChatMessageItem';
import ChatMessage from '../../models/ChatMessage.js';

interface Props {
	messages: ChatMessage[];
	sendMessage: (message: string) => void;
	login: (username: string) => void;
	loggedIn: boolean;
}
interface State {
	nickname: string;
	msg: string;
	messages: any[];
}
export default class Chat extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			// joined: false,
			nickname: '',
			msg: '',
			messages: []
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleMsgChange = this.handleMsgChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
	}

	// private chatRoom: firebase.firestore.CollectionReference;

	// private cleanup: () => void;

	render(): ReactNode {
		const { messages } = this.props;

		return (
			<div className="App">
				{!this.props.loggedIn ? (
					<div className="joinForm">
						<input
							placeholder="Nickname"
							value={this.state.nickname}
							onChange={this.handleNameChange}
						/>
						<br />
						<button onClick={this.handleClick}>Join</button>
					</div>
				) : (
					<div className="chat">
						<div className="messages">
							{messages.map(
								(x, idx): ReactElement => (
									<ChatMessageItem
										message={x}
										key={idx}
										isOwner={x.sender === this.state.nickname}
									/>
								)
							)}
						</div>
						<input
							placeholder="msg or d20+4 etc"
							onChange={this.handleMsgChange}
							onKeyDown={this.handleKeyDown}
							value={this.state.msg}
						/>
						<br />
					</div>
				)}
			</div>
		);
	}

	// handleNewMessages(snap: firebase.firestore.QuerySnapshot): void {
	// 	this.setState({
	// 		messages: [].concat(this.state.messages, snap.docChanges().map(x => x.doc.data()))
	// 	});
	// }

	componentDidMount(): void {
		// firebase.initializeApp(FirebaseConfig);
		// this.chatRoom = firebase.firestore().collection('chatroom');
		// this.cleanup = firebase
		// 	.firestore()
		// 	.collection('chatroom')
		// 	.orderBy('timestamp', 'asc')
		// 	.onSnapshot(this.handleNewMessages);
	}

	componentWillUnmount(): void {
		// this.cleanup();
	}

	handleNameChange(e): void {
		this.setState({ nickname: e.target.value });
	}

	handleClick(e): void {
		// firebase
		// 	.firestore()
		// 	.collection('nicknames')
		// 	.add({
		// 		nickname: this.state.nickname
		// 	});
		// this.setState({ joined: true });
		this.props.login(this.state.nickname);
	}

	handleMsgChange(e): void {
		this.setState({ msg: e.target.value });
	}

	handleKeyDown(e): void {
		if (e.key === 'Enter') {
			if (this.state.msg.match(/^\d*?d(\d+|%)/)) {
				const roll = new DiceRoll(this.state.msg);
				this.sendMessage(`Rolling ${roll}`);
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
