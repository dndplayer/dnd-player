import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import PlayerCharacterSheetWrapper from './pc/PlayerCharacterSheetWrapper';

import { saveNewMessage } from '../../../redux/actions/chat';
import { Character, PlayerCharacter, NonPlayerCharacter } from '../../models/Character';
import { Actions } from '../../../redux/actions/assets';
import { Upload } from '../../../models/Upload';
import NonPlayerCharacterSheetWrapper from './npc/NonPlayerCharacterSheetWrapper';
import { ChatMessageData } from '../../../models/ChatMessage';

const mapStateToProps = (state): any => ({
	playerCharacters: state.assets.playerCharacters,
	nonPlayerCharacters: state.assets.nonPlayerCharacters,
	images: state.images.images
});

const mapDispatchToProps = (dispatch): any => ({
	sendMessage: (message, data?) => dispatch(saveNewMessage(message, data)),
	updatePlayerCharacter: (characterId, character) =>
		dispatch(Actions.updatePlayerCharacter(characterId, character)),
	updateNonPlayerCharacter: (characterId, character) =>
		dispatch(Actions.updateNonPlayerCharacter(characterId, character))
});

interface DispatchFromProps {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updatePlayerCharacter: (characterId: string, character: Character) => void;
	updateNonPlayerCharacter: (characterId: string, character: Character) => void;
}

interface StateFromProps {
	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];
	images: Upload[];
}

interface OwnProps {
	characterSheetId: string;
}

type Props = DispatchFromProps & StateFromProps & OwnProps;

export class InlineCharacterSheetContainer extends Component<Props> {
	render(): ReactNode {
		const { images, playerCharacters, nonPlayerCharacters, characterSheetId } = this.props;

		if (!characterSheetId) {
			return null;
		}
		const pc = playerCharacters.find(x => x.id === characterSheetId);
		if (pc) {
			const image = images.find(x => x.filePath === pc.imageRef);
			return (
				<PlayerCharacterSheetWrapper
					character={pc}
					image={image}
					editing={false}
					inline={true}
					{...this.props}
				/>
			);
		}
		const npc = nonPlayerCharacters.find(x => x.id === characterSheetId);
		if (npc) {
			const image = images.find(x => x.filePath === npc.imageRef);
			return (
				<NonPlayerCharacterSheetWrapper
					character={npc}
					characterId={this.props.characterSheetId}
					image={image}
					editing={false}
					inline={true}
					{...this.props}
				/>
			);
		}

		return null;
	}
}

export default connect<StateFromProps, DispatchFromProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(InlineCharacterSheetContainer);
