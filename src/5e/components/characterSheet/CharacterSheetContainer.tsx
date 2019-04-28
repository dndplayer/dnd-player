import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import CharacterSheet from './CharacterSheet';
import { ChatMessageData } from '../../../models/ChatMessage';

import { saveNewMessage } from '../../../redux/actions/chat';
import { Character } from '../../models/Character';
import { closeCharacterSheet } from '../../../redux/actions/characters';
import { updatePlayerCharacter } from '../../../redux/actions/assets';

const mapStateToProps = (state): any => ({
	playerCharacters: state.assets.playerCharacters,
	openCharacterSheets: state.characters.openCharacterSheets
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
	popout?: string;
}

// interface OwnProps {}

type Props = DispatchFromProps & StateFromProps;

class CharacterSheetContainer extends Component<Props> {
	render(): ReactNode {
		const characterSheets = [];
		if (this.props.popout) {
			const character = this.props.playerCharacters.find(x => x.id === this.props.popout);
			if (character) {
				return (
					<CharacterSheet
						key={this.props.popout}
						character={character}
						popout="popout"
						{...this.props}
					/>
				);
			}
		}

		for (const characterId of this.props.openCharacterSheets) {
			const character = this.props.playerCharacters.find(x => x.id === characterId);
			if (character) {
				characterSheets.push(
					<CharacterSheet key={characterId} character={character} {...this.props} />
				);
			}
		}
		return <div>{characterSheets}</div>;
	}
}

export default connect<StateFromProps, DispatchFromProps, void>(
	mapStateToProps,
	mapDispatchToProps
)(CharacterSheetContainer);
