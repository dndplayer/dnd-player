import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import PlayerCharacterSheetWrapper from './pc/PlayerCharacterSheetWrapper';

import { saveNewMessage } from '../../../redux/actions/chat';
import { Character, PlayerCharacter, NonPlayerCharacter } from '../../models/Character';
import { updateNonPlayerCharacter } from '../../../redux/actions/assets';
import { Upload } from '../../../models/Upload';
import NonPlayerCharacterSheetWrapper from './npc/NonPlayerCharacterSheetWrapper';
import { ChatMessageData } from '../../../models/ChatMessage';
import { MapObject } from '../../../models/Map';
import { mapsUpdateObject } from '../../../redux/actions/maps';

const mapStateToProps = (state): any => ({
	nonPlayerCharacters: state.assets.nonPlayerCharacters,
	images: state.images.images
});

const mapDispatchToProps = (dispatch): any => ({
	sendMessage: (message, data?) => dispatch(saveNewMessage(message, data)),
	updateNonPlayerCharacter: (characterId, character) =>
		dispatch(updateNonPlayerCharacter(characterId, character)),
	updateToken: (mapId, tokenId, token) => dispatch(mapsUpdateObject(mapId, tokenId, token))
});

interface DispatchFromProps {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updateNonPlayerCharacter: (characterId: string, character: Character) => void;
	updateToken: (mapId: string, tokenId: string, token: MapObject) => void;
}

interface StateFromProps {
	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];
	images: Upload[];
}

interface OwnProps {
	characterSheetId: string;
	token: MapObject;
	tokenId: string;
	mapId: string;
}

type Props = DispatchFromProps & StateFromProps & OwnProps;

export class TokenCharacterSheetContainer extends Component<Props> {
	render(): ReactNode {
		const { images, nonPlayerCharacters, characterSheetId, token } = this.props;
		const updateCharacter = this.updateCharacter.bind(this);

		if (!characterSheetId) {
			return null;
		}
		const npc = nonPlayerCharacters.find(x => x.id === characterSheetId);
		if (npc) {
			const image = images.find(x => x.filePath === npc.imageRef);
			return (
				<NonPlayerCharacterSheetWrapper
					{...this.props}
					character={{
						...npc,
						hp: token.hp && token.hp.value,
						maxHp: token.hp && token.hp.max
					}}
					characterId={this.props.characterSheetId}
					image={image}
					editing={false}
					inline={true}
					updateNonPlayerCharacter={updateCharacter}
				/>
			);
		}

		return null;
	}

	updateCharacter(characterId, character) {
		this.props.updateToken(this.props.mapId, this.props.tokenId, {
			...this.props.token,
			hp: { value: character.hp, max: character.maxHp }
		});
	}
}

export default connect<StateFromProps, DispatchFromProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(TokenCharacterSheetContainer);
