import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Chat from './Chat';
import { ChatMessage, ChatMessageData } from '../../models/ChatMessage';

import { saveNewMessage } from '../../redux/actions/chat';
import { login } from '../../redux/actions/auth';
import WindowPortal from '../util/WindowPortal';
import { Icon } from '@material-ui/core';

const mapStateToProps = (state): any => ({
	messages: state.chat.messages,
	loggedIn: state.auth.loggedIn,
	user: state.auth.user
});

const mapDispatchToProps = (dispatch): any => ({
	sendMessage: (message, data?) => dispatch(saveNewMessage(message, data)),
	login: (username, password) => dispatch(login(username, password))
});

interface DispatchFromProps {
	login: (username: string, password: string) => void;
	sendMessage: (message: string, data?: ChatMessageData) => void;
}

interface StateFromProps {
	messages: ChatMessage[];
	loggedIn: boolean;
	user: firebase.User;
}

// interface OwnProps {}

type Props = DispatchFromProps & StateFromProps;

interface State {
	showWindowPortal: boolean;
}

class ChatContainer extends Component<Props> {
	state = {
		showWindowPortal: false
	};

	private _chat: Chat;

	componentDidUpdate(prevProps, prevState) {
		if (this.state.showWindowPortal && !prevState.showWindowPortal) {
			// this._chat.forceUpdate();
			this.forceUpdate();
		}
	}

	render(): ReactNode {
		const chat = (
			<Chat
				ref={c => (this._chat = c)}
				{...this.props}
				testButton={() => console.log('TEST BUTTON')}
			/>
		);
		return (
			<div>
				{!this.state.showWindowPortal ? (
					<div>
						{chat}
						<Icon
							style={{
								position: 'absolute',
								top: 60,
								right: 5,
								cursor: 'pointer',
								fontSize: 18
							}}
							onClick={() => this.setState({ showWindowPortal: true })}
						>
							open_in_new
						</Icon>
					</div>
				) : (
					<WindowPortal
						title="Chat"
						onClose={() => this.setState({ showWindowPortal: false })}
					>
						{chat}
					</WindowPortal>
				)}
			</div>
		);
	}
}

export default connect<StateFromProps, DispatchFromProps, void>(
	mapStateToProps,
	mapDispatchToProps
)(ChatContainer);
