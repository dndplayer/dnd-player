import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Chat from './Chat';
import ChatMessage from '../../models/ChatMessage';

import { saveNewMessage } from '../../redux/actions/chat';

const mapStateToProps = (state): any => ({
	messages: state.chat.messages
});

const mapDispatchToProps = (dispatch): any => ({
	sendMessage: message => dispatch(saveNewMessage(message))
});

interface Props {
	messages?: ChatMessage[];
	sendMessage?: (message: string) => void;
}

@connect<{}, {}, Props>(
	mapStateToProps,
	mapDispatchToProps
)
export default class ChatContainer extends Component<Props> {
	render(): ReactNode {
		return <Chat messages={this.props.messages} sendMessage={this.props.sendMessage} />;
	}
}
