import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';

import { Character, NonPlayerCharacter } from '../../../models/Character';
import { Upload } from '../../../../models/Upload';
import NonPlayerCharacterSheet from './NonPlayerCharacterSheet';
import NonPlayerCharacterSheetEditor from './editor/NonPlayerCharacterSheetEditor';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updateNonPlayerCharacter: (characterId: string, character: Character) => void;
	abortEditNonPlayerCharacter: (characterId: string) => void;
	editNonPlayerCharacter: (characterId: string) => void;
	character: NonPlayerCharacter;
	characterId: string;
	popout?: string;
	image: Upload;
	editing: boolean;
}

export default class NonPlayerCharacterSheetWrapper extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {
			editing: false
		};
	}

	render(): ReactNode {
		const { editing } = this.props;

		const inner = editing ? (
			<NonPlayerCharacterSheetEditor {...this.props} />
		) : (
			<NonPlayerCharacterSheet {...this.props} />
		);
		return <div className="character-sheet popout"> {inner} </div>;
	}
}
