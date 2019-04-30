import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import PlayerCharacterSheet from './pc/PlayerCharacterSheet';
import NonPlayerCharacterSheet from './npc/NonPlayerCharacterSheet';
import { ChatMessageData } from '../../../models/ChatMessage';

import { saveNewMessage } from '../../../redux/actions/chat';
import { Character, NonPlayerCharacter, PlayerCharacter } from '../../models/Character';
import { closeCharacterSheet } from '../../../redux/actions/characters';
import { updatePlayerCharacter, updateNonPlayerCharacter } from '../../../redux/actions/assets';
import { Upload } from '../../../models/Upload';

const mapStateToProps = (state): any => ({
	playerCharacters: state.assets.playerCharacters,
	nonPlayerCharacters: state.assets.nonPlayerCharacters,
	openCharacterSheets: state.characters.openCharacterSheets,
	images: state.images.images
});

const mapDispatchToProps = (dispatch): any => ({
	sendMessage: (message, data?) => dispatch(saveNewMessage(message, data)),
	closeCharacterSheet: characterId => dispatch(closeCharacterSheet(characterId)),
	updatePlayerCharacter: (characterId, character) =>
		dispatch(updatePlayerCharacter(characterId, character)),
	updateNonPlayerCharacter: (characterId, character) =>
		dispatch(updateNonPlayerCharacter(characterId, character))
});

interface DispatchFromProps {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	closeCharacterSheet: (characterId: string) => void;
	updatePlayerCharacter: (characterId: string, character: Character) => void;
	updateNonPlayerCharacter: (characterId: string, character: Character) => void;
}

interface StateFromProps {
	openCharacterSheets: string[];
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
			openCharacterSheets
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
					<NonPlayerCharacterSheet
						key={popout}
						character={npc}
						popout="popout"
						image={image}
						{...this.props}
					/>
				);
			}
		}

		for (const characterId of openCharacterSheets) {
			const pc = playerCharacters.find(x => x.id === characterId);
			if (pc) {
				const image = images.find(x => x.filePath === pc.imageRef);
				characterSheets.push(
					<PlayerCharacterSheet
						key={characterId}
						character={pc}
						image={image}
						{...this.props}
					/>
				);
				continue;
			}
			const npc = nonPlayerCharacters.find(x => x.id === characterId);
			if (npc) {
				const image = images.find(x => x.filePath === npc.imageRef);
				characterSheets.push(
					<NonPlayerCharacterSheet
						key={characterId}
						character={npc}
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
