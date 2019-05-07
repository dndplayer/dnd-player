import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Chat from './Chat';
import { ChatMessage, ChatMessageData } from '../../models/ChatMessage';

import { saveNewMessage } from '../../redux/actions/chat';
import { login } from '../../redux/actions/auth';
import WindowPortal from '../util/WindowPortal';
import { Icon } from '@material-ui/core';
import { Rnd } from 'react-rnd';

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
		const chat = <Chat ref={c => (this._chat = c)} {...this.props} />;
		return (
			<div style={{ height: '100%' }}>
				{!this.state.showWindowPortal ? (
					// TODO: All this view specific code e.g. RND shouldn't be in the container!
					// Containers are for Data, so move all this into a view based component.
					<Rnd
						default={{
							x: 0,
							y: -300, // TODO: -300px if messages open and -100px if not
							width: '400px',
							height: '300px' // TODO: 300px if messages open and 100px if not
							// height: 'auto'
						}}
						minWidth={200}
						minHeight={100}
						disableDragging={true}
						style={{
							zIndex: 9,
							backgroundColor: 'rgba(255, 255, 255, 0.4)'
						}}
					>
						<div
							style={{
								height: '100%',
								position: 'relative'
							}}
						>
							<div style={{ height: '100%' }}>
								{chat}
								<Icon
									style={{
										position: 'absolute',
										top: -18,
										right: 5,
										cursor: 'pointer',
										fontSize: 18
									}}
									onClick={() => this.setState({ showWindowPortal: true })}
								>
									open_in_new
								</Icon>
							</div>
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
