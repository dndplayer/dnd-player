import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';

interface IAppState {
	joined: boolean;
	nickname: string;
	msg: string;
	messages: {};
}

class App extends Component<object, IAppState> {
	private chatRoom: firebase.firestore.CollectionReference;

	private cleanup: () => void;

	constructor(props) {
		super(props);
		this.state = {
			joined: false,
			nickname: '',
			msg: '',
			messages: {}
		};
		const config = {
			/* REDACTED: obtainable from Firebase/Project Settings/Select a platform to get started. */
		};
		firebase.initializeApp(config);
		this.chatRoom = firebase.firestore().collection('chatroom');
	}

	handleNewMessages = (snap: firebase.firestore.QuerySnapshot) => {
		this.setState({
			messages: [].concat(this.state.messages, snap.docChanges().map(x => x.doc.data()))
		});
	};

	componentDidMount() {
		this.cleanup = firebase
			.firestore()
			.collection('chatroom')
			.orderBy('timestamp', 'asc')
			.onSnapshot(this.handleNewMessages);
	}

	componentWillUnmount() {
		this.cleanup();
	}

	handleNameChange = e => this.setState({ nickname: e.target.value });

	handleClick = e => {
		firebase
			.firestore()
			.collection('nicknames')
			.add({
				nickname: this.state.nickname
			});
		this.setState({ joined: true });
	};

	handleMsgChange = e => this.setState({ msg: e.target.value });

	handleKeyDown = e => {
		if (e.key === 'Enter') {
			this.chatRoom.add({
				sender: this.state.nickname,
				msg: this.state.msg,
				timestamp: firebase.firestore.Timestamp.now()
			});
			this.setState({ msg: '' });
		}
	};

	render() {
		return (
			<div className="App">
				{!this.state.joined ? (
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
							{Object.keys(this.state.messages).map(message => {
								if (this.state.messages[message].sender === this.state.nickname)
									return (
										<div className="message">
											<span id="me">
												{this.state.messages[message].sender} :
											</span>
											<br />
											{this.state.messages[message].msg}
										</div>
									);
								return (
									<div className="message">
										<span id="sender">
											{this.state.messages[message].sender} :
										</span>
										<br />
										{this.state.messages[message].msg}
									</div>
								);
							})}
						</div>
						<input
							placeholder="msg"
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
}

export default App;
