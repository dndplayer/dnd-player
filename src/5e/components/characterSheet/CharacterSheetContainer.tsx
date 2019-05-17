import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import PlayerCharacterSheetWrapper from './pc/PlayerCharacterSheetWrapper';

import { saveNewMessage } from '../../../redux/actions/chat';
import { Character, PlayerCharacter, NonPlayerCharacter } from '../../models/Character';
import {
	updatePlayerCharacter,
	updateNonPlayerCharacter,
	openCharacterSheet
} from '../../../redux/actions/assets';
import { Upload } from '../../../models/Upload';
import NonPlayerCharacterSheetWrapper from './npc/NonPlayerCharacterSheetWrapper';
import { ChatMessageData } from '../../../models/ChatMessage';
import { abortEditCharacterSheet, editCharacterSheet } from '../../../redux/actions/characters';
import WindowPortal from '../../../components/util/WindowPortal';

const mapStateToProps = (state): any => ({
	playerCharacters: state.assets.playerCharacters,
	nonPlayerCharacters: state.assets.nonPlayerCharacters,
	editingCharacterSheets: state.characters.editingCharacterSheets,
	activeCharacterSheetId: state.assets.activeCharacterSheetId,
	images: state.images.images
});

const mapDispatchToProps = (dispatch): any => ({
	sendMessage: (message, data?) => dispatch(saveNewMessage(message, data)),
	updatePlayerCharacter: (characterId, character) =>
		dispatch(updatePlayerCharacter(characterId, character)),
	editPlayerCharacter: characterId => dispatch(editCharacterSheet(characterId)),
	abortEditPlayerCharacter: characterId => dispatch(abortEditCharacterSheet(characterId)),
	updateNonPlayerCharacter: (characterId, character) =>
		dispatch(updateNonPlayerCharacter(characterId, character)),
	editNonPlayerCharacter: characterId => dispatch(editCharacterSheet(characterId)),
	abortEditNonPlayerCharacter: characterId => dispatch(abortEditCharacterSheet(characterId)),
	openCharacterSheet: characterId => dispatch(openCharacterSheet(characterId))
});

interface DispatchFromProps {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updatePlayerCharacter: (characterId: string, character: Character) => void;
	editPlayerCharacter: (characterId: string) => void;
	abortEditPlayerCharacter: (characterId: string) => void;
	updateNonPlayerCharacter: (characterId: string, character: Character) => void;
	editNonPlayerCharacter: (characterId: string) => void;
	abortEditNonPlayerCharacter: (characterId: string) => void;
	openCharacterSheet: (characterId: string) => void;
}

interface StateFromProps {
	editingCharacterSheets: string[];
	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];
	images: Upload[];
	activeCharacterSheetId: string;
}

// interface OwnProps {}

type Props = DispatchFromProps & StateFromProps;

export class CharacterSheetContainer extends Component<Props> {
	render(): ReactNode {
		const {
			images,
			playerCharacters,
			nonPlayerCharacters,
			editingCharacterSheets,
			activeCharacterSheetId
		} = this.props;

		if (!activeCharacterSheetId) {
			return null;
		}
		const pc = playerCharacters.find(x => x.id === this.props.activeCharacterSheetId);
		if (pc) {
			const image = images.find(x => x.filePath === pc.imageRef);
			return (
				<WindowPortal
					title="Character Sheet"
					onClose={() => this.props.openCharacterSheet(null)}
				>
					<PlayerCharacterSheetWrapper
						character={pc}
						image={image}
						editing={editingCharacterSheets.some(y => y === pc.id)}
						{...this.props}
					/>
				</WindowPortal>
			);
		}
		const npc = nonPlayerCharacters.find(x => x.id === this.props.activeCharacterSheetId);
		if (npc) {
			const image = images.find(x => x.filePath === npc.imageRef);
			return (
				<WindowPortal
					title="Character Sheet"
					onClose={() => this.props.openCharacterSheet(null)}
				>
					<NonPlayerCharacterSheetWrapper
						character={npc}
						characterId={this.props.activeCharacterSheetId}
						image={image}
						editing={editingCharacterSheets.some(
							y => y === this.props.activeCharacterSheetId
						)}
						{...this.props}
					/>
				</WindowPortal>
			);
		}

		return null;
	}
}

export default connect<StateFromProps, DispatchFromProps, void>(
	mapStateToProps,
	mapDispatchToProps
)(CharacterSheetContainer);
