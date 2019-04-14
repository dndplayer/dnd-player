import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Chat from './Chat';
import ChatMessage from '../../models/ChatMessage';

const mapStateToProps = (state): any => ({
	messages: state.chat.messages
});

interface Props {
	messages?: ChatMessage[];
}

// @connect<{}, {}, Props>(mapStateToProps)
class ChatContainer extends Component<Props> {
	render(): ReactNode {
		return <Chat messages={this.props.messages} />;
	}
}

export default connect<{}, {}, Props>(mapStateToProps)(ChatContainer);
