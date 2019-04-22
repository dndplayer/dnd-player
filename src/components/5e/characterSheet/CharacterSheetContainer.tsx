import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import CharacterSheet from './CharacterSheet';
import { ChatMessageData } from '../../../models/ChatMessage';

import { saveNewMessage } from '../../../redux/actions/chat';
import { Character } from '../Character';
import { closeCharacterSheet } from '../../../redux/actions/characters';

const mapStateToProps = (state): any => ({
	openCharacterSheets: state.characters.openCharacterSheets,
	characters: state.characters.characters
});

const mapDispatchToProps = (dispatch): any => ({
	sendMessage: (message, data?) => dispatch(saveNewMessage(message, data)),
	closeCharacterSheet: characterId => dispatch(closeCharacterSheet(characterId))
});

interface DispatchFromProps {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	closeCharacterSheet: (characterId: string) => void;
}

interface StateFromProps {
	openCharacterSheets: string[];
	characters: Character[];
}

// interface OwnProps {}

type Props = DispatchFromProps & StateFromProps;

class CharacterSheetContainer extends Component<Props> {
	render(): ReactNode {
		const characterSheets = [];
		for (const characterId of this.props.openCharacterSheets) {
			characterSheets.push(
				<CharacterSheet
					key={characterId}
					character={this.props.characters.filter(x => x.id === characterId)[0]}
					{...this.props}
				/>
			);
		}
		return <div>{characterSheets}</div>;
	}
}

export default connect<StateFromProps, DispatchFromProps, void>(
	mapStateToProps,
	mapDispatchToProps
)(CharacterSheetContainer);
