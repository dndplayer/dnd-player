import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import CharacterSheet from './CharacterSheet';
import { ChatMessage, ChatMessageData } from '../../models/ChatMessage';

import { saveNewMessage } from '../../redux/actions/chat';

const mapStateToProps = (state): any => ({});

const mapDispatchToProps = (dispatch): any => ({
	sendMessage: (message, data?) => dispatch(saveNewMessage(message, data))
});

interface DispatchFromProps {
	sendMessage: (message: string, data?: ChatMessageData) => void;
}

interface StateFromProps {}

// interface OwnProps {}

type Props = DispatchFromProps & StateFromProps;

class CharacterSheetContainer extends Component<Props> {
	render(): ReactNode {
		return <CharacterSheet {...this.props} />;
	}
}

export default connect<StateFromProps, DispatchFromProps, void>(
	mapStateToProps,
	mapDispatchToProps
)(CharacterSheetContainer);
