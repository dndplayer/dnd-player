import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import CharacterSheet from './CharacterSheet';
import { ChatMessageData } from '../../../models/ChatMessage';

import { saveNewMessage } from '../../../redux/actions/chat';
import { Character } from '../Character';
import { closeCharacterSheet } from '../../../redux/actions/characters';
import { updatePlayerCharacter } from '../../../redux/actions/assets';

const mapStateToProps = (state): any => ({
	openCharacterSheets: state.characters.openCharacterSheets,
	playerCharacters: state.assets.playerCharacters
});

const mapDispatchToProps = (dispatch): any => ({
	sendMessage: (message, data?) => dispatch(saveNewMessage(message, data)),
	closeCharacterSheet: characterId => dispatch(closeCharacterSheet(characterId)),
	updatePlayerCharacter: (characterId, character) =>
		dispatch(updatePlayerCharacter(characterId, character))
});

interface DispatchFromProps {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	closeCharacterSheet: (characterId: string) => void;
	updatePlayerCharacter: (characterId: string, character: Character) => void;
}

interface StateFromProps {
	openCharacterSheets: string[];
	playerCharacters: Character[];
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
					character={this.props.playerCharacters.filter(x => x.id === characterId)[0]}
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
