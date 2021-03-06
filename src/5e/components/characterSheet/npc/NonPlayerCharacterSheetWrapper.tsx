import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheet.module.scss';
import { Character, NonPlayerCharacter } from '../../../models/Character';
import { Upload } from '../../../../models/Upload';
import NonPlayerCharacterSheet from './NonPlayerCharacterSheet';
import NonPlayerCharacterSheetEditor from './editor/NonPlayerCharacterSheetEditor';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updateNonPlayerCharacter: (characterId: string, character: Character) => void;
	abortEditNonPlayerCharacter?: (characterId: string) => void;
	editNonPlayerCharacter?: (characterId: string) => void;
	character: NonPlayerCharacter;
	characterId: string;
	image: Upload;
	editing: boolean;
	inline?: boolean;
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
			<NonPlayerCharacterSheetEditor
				abortEditNonPlayerCharacter={this.props.abortEditNonPlayerCharacter}
				{...this.props}
			/>
		) : (
			<NonPlayerCharacterSheet {...this.props} />
		);
		return inner;
	}
}
