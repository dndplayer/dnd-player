import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import PlayerCharacterSheet from './pc/PlayerCharacterSheet';

import { saveNewMessage } from '../../../redux/actions/chat';
import { Character, NonPlayerCharacter, PlayerCharacter } from '../../models/Character';
import { updatePlayerCharacter, updateNonPlayerCharacter } from '../../../redux/actions/assets';
import { Upload } from '../../../models/Upload';
import NonPlayerCharacterSheetWrapper from './npc/NonPlayerCharacterSheetWrapper';
import { ChatMessageData } from '../../../models/ChatMessage';
import { abortEditCharacterSheet, editCharacterSheet } from '../../../redux/actions/characters';

const mapStateToProps = (state): any => ({
	playerCharacters: state.assets.playerCharacters,
	nonPlayerCharacters: state.assets.nonPlayerCharacters,
	editingCharacterSheets: state.characters.editingCharacterSheets,
	images: state.images.images
});

const mapDispatchToProps = (dispatch): any => ({
	sendMessage: (message, data?) => dispatch(saveNewMessage(message, data)),
	updatePlayerCharacter: (characterId, character) =>
		dispatch(updatePlayerCharacter(characterId, character)),
	updateNonPlayerCharacter: (characterId, character) =>
		dispatch(updateNonPlayerCharacter(characterId, character)),
	editNonPlayerCharacter: characterId => dispatch(editCharacterSheet(characterId)),
	abortEditNonPlayerCharacter: characterId => dispatch(abortEditCharacterSheet(characterId))
});

interface DispatchFromProps {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updatePlayerCharacter: (characterId: string, character: Character) => void;
	updateNonPlayerCharacter: (characterId: string, character: Character) => void;
	editNonPlayerCharacter: (characterId: string) => void;
	abortEditNonPlayerCharacter: (characterId: string) => void;
}

interface StateFromProps {
	editingCharacterSheets: string[];
	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];
	images: Upload[];
	popout?: string;
}

// interface OwnProps {}

type Props = DispatchFromProps & StateFromProps;

export class CharacterSheetContainer extends Component<Props> {
	render(): ReactNode {
		const {
			popout,
			images,
			playerCharacters,
			nonPlayerCharacters,
			editingCharacterSheets
		} = this.props;

		const characterSheets = [];
		if (popout) {
			const pc = playerCharacters.find(x => x.id === this.props.popout);
			if (pc) {
				const image = images.find(x => x.filePath === pc.imageRef);
				return (
					<PlayerCharacterSheet
						key={popout}
						character={pc}
						popout="popout"
						image={image}
						{...this.props}
					/>
				);
			}
			const npc = nonPlayerCharacters.find(x => x.id === this.props.popout);
			if (npc) {
				const image = images.find(x => x.filePath === npc.imageRef);
				return (
					<NonPlayerCharacterSheetWrapper
						key={popout}
						character={npc}
						popout="popout"
						image={image}
						editing={editingCharacterSheets.some(y => y === npc.id)}
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
