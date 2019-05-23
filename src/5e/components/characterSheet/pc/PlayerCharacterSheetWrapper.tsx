import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';

import { Character, PlayerCharacter, CharacterSpell } from '../../../models/Character';
import { Upload } from '../../../../models/Upload';
import PlayerCharacterSheet from './PlayerCharacterSheet';
import PlayerCharacterSheetEditor from './editor/PlayerCharacterSheetEditor';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updatePlayerCharacter: (characterId: string, character: Character) => void;
	abortEditPlayerCharacter?: (characterId: string) => void;
	editPlayerCharacter: (characterId: string) => void;
	character: PlayerCharacter;
	image: Upload;
	editing: boolean;
	inline?: boolean;
	spells: CharacterSpell[];
}

export default class PlayerCharacterSheetWrapper extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {
			editing: false
		};
	}

	render(): ReactNode {
		const { editing } = this.props;

		const inner = editing ? (
			<PlayerCharacterSheetEditor
				abortEditPlayerCharacter={this.props.abortEditPlayerCharacter}
				{...this.props}
			/>
		) : (
			<PlayerCharacterSheet {...this.props} />
		);
		return inner;
	}
}
