import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';

import { Character, PlayerCharacter } from '../../../models/Character';
import { Upload } from '../../../../models/Upload';
import PlayerCharacterSheet from './PlayerCharacterSheet';
import PlayerCharacterSheetEditor from './editor/PlayerCharacterSheetEditor';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updatePlayerCharacter: (characterId: string, character: Character) => void;
	abortEditPlayerCharacter: (characterId: string) => void;
	editPlayerCharacter: (characterId: string) => void;
	character: PlayerCharacter;
	popout?: string;
	image: Upload;
	editing: boolean;
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
			<PlayerCharacterSheetEditor {...this.props} />
		) : (
			<PlayerCharacterSheet {...this.props} />
		);
		return <div className="character-sheet popout"> {inner} </div>;
	}
}
