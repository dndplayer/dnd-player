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
import { Rnd, ResizableDelta, Position } from 'react-rnd';

const mapStateToProps = (state): any => ({
	messages: state.chat.messages,
	recentMessages: getRecentMessages(state),
	loggedIn: state.auth.loggedIn,
	user: state.auth.user,
	messagesOpen: state.chat.messagesOpen,
	currentTime: state.globalState.currentTime
});

const mapDispatchToProps = (dispatch): any => ({
	sendMessage: (message, data?): void => dispatch(saveNewMessage(message, data)),
	login: (username, password): void => dispatch(login(username, password)),
	closeChat: (): void => dispatch(closeChat()),
	openChat: (): void => dispatch(openChat()),
	updateTime: (): void => dispatch(updateTime())
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
	chatPosition: Position;
	chatDelta: ResizableDelta;
}

class ChatContainer extends Component<Props, State> {
	state = {
		showWindowPortal: false,
		chatPosition: { x: 440, y: -640 },
		chatDelta: { width: 440, height: 600 }
	};

	private _chat: Chat;

	componentDidUpdate(prevProps, prevState): void {
		if (this.state.showWindowPortal && !prevState.showWindowPortal) {
			// this._chat.forceUpdate();
			this.forceUpdate();
		}
	}
	render(): ReactNode {
		const chat = (
			<Chat
				{...this.props}
				ref={(c): Chat => (this._chat = c)}
				messagesOpen={this.props.messagesOpen || this.state.showWindowPortal}
			/>
		);
		return (
			<div style={{ height: '100%' }}>
				{!this.state.showWindowPortal ? (
					// TODO: All this view specific code e.g. RND shouldn't be in the container!
					// Containers are for Data, so move all this into a view based component.
					<div>
						<ChatDisplay {...this.props} />
						{this.props.messagesOpen && (
							<Rnd
								default={{
									x: this.state.chatPosition.x,
									y: this.state.chatPosition.y,
									width: this.state.chatDelta.width,
									height: this.state.chatDelta.height
								}}
								minWidth={200}
								minHeight={100}
								disableDragging={true}
								onResizeStop={(e, dir, elementRef, delta, position): void =>
									this.setState(
										(prevState): Pick<State, never> => ({
											chatPosition: position,
											chatDelta: {
												width: prevState.chatDelta.width + delta.width,
												height: prevState.chatDelta.height + delta.height
											}
										})
									)
								}
							>
								{this.props.messagesOpen && chat}
								{this.props.messagesOpen && (
									<Icon
										style={{
											position: 'absolute',
											top: 5,
											right: 5,
											cursor: 'pointer',
											fontSize: 18,
											color: '#d29a38'
										}}
										onClick={(): void =>
											this.setState({ showWindowPortal: true })
										}
									>
										open_in_new
									</Icon>
								)}
							</Rnd>
						)}
					</div>
				) : (
					<WindowPortal
						title="Chat"
						width={440}
						height={600}
						onClose={(): void => this.setState({ showWindowPortal: false })}
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
