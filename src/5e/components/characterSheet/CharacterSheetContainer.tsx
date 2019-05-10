import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import PlayerCharacterSheetWrapper from './pc/PlayerCharacterSheetWrapper';

import { saveNewMessage } from '../../../redux/actions/chat';
import {
	Character,
	NonPlayerCharacterIndex,
	PlayerCharacter,
	NonPlayerCharacter
} from '../../models/Character';
import {
	updatePlayerCharacter,
	updateNonPlayerCharacter,
	loadFullNonPlayerCharacter
} from '../../../redux/actions/assets';
import { Upload } from '../../../models/Upload';
import NonPlayerCharacterSheetWrapper from './npc/NonPlayerCharacterSheetWrapper';
import { ChatMessageData } from '../../../models/ChatMessage';
import { abortEditCharacterSheet, editCharacterSheet } from '../../../redux/actions/characters';

const mapStateToProps = (state): any => ({
	playerCharacters: state.assets.playerCharacters,
	nonPlayerCharactersIndex: state.assets.nonPlayerCharactersIndex,
	nonPlayerCharacters: state.assets.nonPlayerCharacters,
	editingCharacterSheets: state.characters.editingCharacterSheets,
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
	loadFullNonPlayerCharacter: characterId => dispatch(loadFullNonPlayerCharacter(characterId)),
	abortEditNonPlayerCharacter: characterId => dispatch(abortEditCharacterSheet(characterId))
});

interface DispatchFromProps {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updatePlayerCharacter: (characterId: string, character: Character) => void;
	editPlayerCharacter: (characterId: string) => void;
	abortEditPlayerCharacter: (characterId: string) => void;
	updateNonPlayerCharacter: (characterId: string, character: Character) => void;
	editNonPlayerCharacter: (characterId: string) => void;
	loadFullNonPlayerCharacter: (characterId: string) => void;
	abortEditNonPlayerCharacter: (characterId: string) => void;
}

interface StateFromProps {
	editingCharacterSheets: string[];
	playerCharacters: PlayerCharacter[];
	nonPlayerCharactersIndex: NonPlayerCharacterIndex[];
	nonPlayerCharacters: NonPlayerCharacter[];
	images: Upload[];
	popout?: string;
}

// interface OwnProps {}

type Props = DispatchFromProps & StateFromProps;

export class CharacterSheetContainer extends Component<Props> {
	componentDidMount(): void {
		this.maybeFetchData();
	}
	componentDidUpdate(): void {
		this.maybeFetchData();
	}
	maybeFetchData(): void {
		if (
			!this.props.playerCharacters.find(x => x.id === this.props.popout) &&
			!this.props.nonPlayerCharacters[this.props.popout]
		) {
			this.props.loadFullNonPlayerCharacter(this.props.popout);
		}
	}
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
					<PlayerCharacterSheetWrapper
						key={popout}
						character={pc}
						popout="popout"
						image={image}
						editing={editingCharacterSheets.some(y => y === pc.id)}
						{...this.props}
					/>
				);
			}
			const npc = nonPlayerCharacters[this.props.popout];
			if (npc) {
				const image = images.find(x => x.filePath === npc.imageRef);
				return (
					<NonPlayerCharacterSheetWrapper
						key={popout}
						character={npc}
						characterId={this.props.popout}
						popout="popout"
						image={image}
						editing={editingCharacterSheets.some(y => y === this.props.popout)}
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
