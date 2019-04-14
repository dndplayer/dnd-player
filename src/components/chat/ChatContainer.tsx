import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Chat from './Chat';
import { ChatMessage, ChatMessageData } from '../../models/ChatMessage';

import { saveNewMessage } from '../../redux/actions/chat';
import { login } from '../../redux/actions/auth';

const mapStateToProps = (state): any => ({
	messages: state.chat.messages,
	loggedIn: state.auth.loggedIn
});

const mapDispatchToProps = (dispatch): any => ({
	sendMessage: (message, data?) => dispatch(saveNewMessage(message, data)),
	login: username => dispatch(login(username))
});

interface DispatchFromProps {
	login: () => void;
	sendMessage: (message: string, data?: ChatMessageData) => void;
}

interface StateFromProps {
	messages: ChatMessage[];
	loggedIn: boolean;
}

// interface OwnProps {}

type Props = DispatchFromProps & StateFromProps;

class ChatContainer extends Component<Props> {
	render(): ReactNode {
		return (
			<Chat
				// login={this.props.login}
				// messages={this.props.messages}
				// sendMessage={this.props.sendMessage}
				// loggedIn={this.props.loggedIn}
				{...this.props}
			/>
		);
	}
}

export default connect<StateFromProps, DispatchFromProps, void>(
	mapStateToProps,
	mapDispatchToProps
)(ChatContainer);
