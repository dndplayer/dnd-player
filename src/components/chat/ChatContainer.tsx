import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Chat from './Chat';
import { ChatMessage, ChatMessageData } from '../../models/ChatMessage';

import { saveNewMessage, closeChat, openChat } from '../../redux/actions/chat';
import { login } from '../../redux/actions/auth';
import ChatDisplay from './ChatDisplay';
import { updateTime } from '../../redux/actions/globalState';
import { getRecentMessages } from '../../redux/selectors/chat';

const mapStateToProps = (state): any => ({
	messages: state.chat.messages,
	recentMessages: getRecentMessages(state),
	loggedIn: state.auth.loggedIn,
	user: state.auth.user,
	messagesOpen: state.chat.messagesOpen,
	currentTime: state.globalState.currentTime
});

const mapDispatchToProps = (dispatch): any => ({
	sendMessage: (message, data?) => dispatch(saveNewMessage(message, data)),
	login: (username, password) => dispatch(login(username, password)),
	closeChat: () => dispatch(closeChat()),
	openChat: () => dispatch(openChat()),
	updateTime: () => dispatch(updateTime())
});

interface DispatchFromProps {
	login: (username: string, password: string) => void;
	sendMessage: (message: string, data?: ChatMessageData) => void;
	closeChat: () => void;
	openChat: () => void;
	updateTime: () => void;
}

interface StateFromProps {
	messages: ChatMessage[];
	recentMessages: ChatMessage[];
	loggedIn: boolean;
	user: firebase.User;
	messagesOpen: boolean;
	currentTime: number;
}

// interface OwnProps {}

type Props = DispatchFromProps & StateFromProps;

class ChatContainer extends Component<Props> {
	render(): ReactNode {
		return (
			<div>
				<Chat {...this.props} />
				<ChatDisplay {...this.props} />
			</div>
		);
	}
}

export default connect<StateFromProps, DispatchFromProps, void>(
	mapStateToProps,
	mapDispatchToProps
)(ChatContainer);
