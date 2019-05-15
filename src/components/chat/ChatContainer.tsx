import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Chat from './Chat';
import { ChatMessage, ChatMessageData } from '../../models/ChatMessage';

import { saveNewMessage, closeChat } from '../../redux/actions/chat';
import { login } from '../../redux/actions/auth';

const mapStateToProps = (state): any => ({
	messages: state.chat.messages,
	loggedIn: state.auth.loggedIn,
	user: state.auth.user,
	messagesOpen: state.chat.messagesOpen
});

const mapDispatchToProps = (dispatch): any => ({
	sendMessage: (message, data?) => dispatch(saveNewMessage(message, data)),
	login: (username, password) => dispatch(login(username, password)),
	closeChat: () => dispatch(closeChat())
});

interface DispatchFromProps {
	login: (username: string, password: string) => void;
	sendMessage: (message: string, data?: ChatMessageData) => void;
	closeChat: () => void;
}

interface StateFromProps {
	messages: ChatMessage[];
	loggedIn: boolean;
	user: firebase.User;
	messagesOpen: boolean;
}

// interface OwnProps {}

type Props = DispatchFromProps & StateFromProps;

class ChatContainer extends Component<Props> {
	render(): ReactNode {
		return <Chat {...this.props} />;
	}
}

export default connect<StateFromProps, DispatchFromProps, void>(
	mapStateToProps,
	mapDispatchToProps
)(ChatContainer);
