import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';

import { saveNewMessage } from '../../../../redux/actions/chat';
import { ChatMessageData } from '../../../../models/ChatMessage';
import CharacterList from '../../../../5e/components/CharacterList';

const mapStateToProps = (state): any => ({
	messages: state.chat.messages,
	loggedIn: state.auth.loggedIn,
	user: state.auth.user
});

const mapDispatchToProps = (dispatch): any => ({
	sendMessage: (message, data?) => dispatch(saveNewMessage(message, data))
});

interface DispatchFromProps {
	login: (username: string, password: string) => void;
	sendMessage: (message: string, data?: ChatMessageData) => void;
}

interface StateFromProps {
	loggedIn: boolean;
	user: firebase.User;
}

// interface OwnProps {}

type Props = DispatchFromProps & StateFromProps;

class ChatContainer extends Component<Props> {
	render(): ReactNode {
		return <CharacterList {...this.props} />;
	}
}

export default connect<StateFromProps, DispatchFromProps, void>(
	mapStateToProps,
	mapDispatchToProps
)(ChatContainer);
