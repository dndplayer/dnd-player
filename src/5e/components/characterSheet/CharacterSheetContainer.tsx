import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import CharacterSheet from './CharacterSheet';
import { ChatMessageData } from '../../../models/ChatMessage';

import { saveNewMessage } from '../../../redux/actions/chat';
import { Character } from '../../models/Character';
import { closeCharacterSheet } from '../../../redux/actions/characters';
import { updatePlayerCharacter } from '../../../redux/actions/assets';
import { Upload } from '../../../models/Upload';

const mapStateToProps = (state): any => ({
	playerCharacters: state.assets.playerCharacters,
	openCharacterSheets: state.characters.openCharacterSheets,
	images: state.images.images
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
	images: Upload[];
	popout?: string;
}

// interface OwnProps {}

type Props = DispatchFromProps & StateFromProps;

class CharacterSheetContainer extends Component<Props> {
	render(): ReactNode {
		const { popout, images, playerCharacters, openCharacterSheets } = this.props;

		const characterSheets = [];
		if (popout) {
			const character = playerCharacters.find(x => x.id === popout);
			if (character) {
				const image = images.find(x => x.filePath === (character as any).imageRef);
				return (
					<CharacterSheet
						key={popout}
						character={character}
						popout="popout"
						image={image}
						{...this.props}
					/>
				);
			}
		}

		for (const characterId of openCharacterSheets) {
			const character = playerCharacters.find(x => x.id === characterId);
			if (character) {
				const image = images.find(x => x.filePath === (character as any).imageRef);
				characterSheets.push(
					<CharacterSheet
						key={characterId}
						character={character}
						image={image}
						{...this.props}
					/>
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
