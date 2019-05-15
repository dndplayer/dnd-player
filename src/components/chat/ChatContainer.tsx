import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Chat from './Chat';
import { ChatMessage, ChatMessageData } from '../../models/ChatMessage';

import { saveNewMessage, closeChat, openChat } from '../../redux/actions/chat';
import { login } from '../../redux/actions/auth';
import ChatDisplay from './ChatDisplay';
import { updateTime } from '../../redux/actions/globalState';
import { getRecentMessages } from '../../redux/selectors/chat';
import WindowPortal from '../util/WindowPortal';
import { Icon } from '@material-ui/core';
import { Rnd } from 'react-rnd';

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

interface State {
	showWindowPortal: boolean;
}

class ChatContainer extends Component<Props, State> {
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
				{...this.props}
				ref={c => (this._chat = c)}
				messagesOpen={this.props.messagesOpen || this.state.showWindowPortal}
			/>
		);
		return (
			<div style={{ height: '100%' }}>
				{!this.state.showWindowPortal ? (
					// TODO: All this view specific code e.g. RND shouldn't be in the container!
					// Containers are for Data, so move all this into a view based component.
					<Rnd
						default={{
							x: 440,
							y: -640,
							width: '500px',
							height: '600px'
						}}
						minWidth={200}
						minHeight={100}
						disableDragging={true}
						style={{
							zIndex: 1
						}}
					>
						<div
							style={{
								height: '100%',
								position: 'relative',
								overflow: 'hidden'
							}}
						>
							{this.props.messagesOpen && chat}
							<ChatDisplay {...this.props} />
							{this.props.messagesOpen && (
								<Icon
									style={{
										position: 'absolute',
										top: 5,
										right: 5,
										cursor: 'pointer',
										fontSize: 18
									}}
									onClick={() => this.setState({ showWindowPortal: true })}
								>
									open_in_new
								</Icon>
							)}
						</div>
					</Rnd>
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
