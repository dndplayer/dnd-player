import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';
import AbilityScore from './AbilityScore';

import css from './NonPlayerCharacterSheet.module.css';
import { Character, NonPlayerCharacter } from '../../../models/Character';
import { Upload } from '../../../../models/Upload';
import CharacterImage from '../CharacterImage';
import AbilityScoreContainer from './AbilityScoreContainer';
import Skills from './Skills';
import Features from './Features';
import Actions from './Actions';
import Senses from './Senses';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updateNonPlayerCharacter: (characterId: string, character: Character) => void;
	abortEditNonPlayerCharacter: (characterId: string) => void;
	character: NonPlayerCharacter;
	popout?: string;
	image: Upload;
}
interface State {
	newCharacter: string;
}

export default class NonPlayerCharacterSheetEditor extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			newCharacter: JSON.stringify(this.props.character, undefined, ' ')
		};
	}

	render(): ReactNode {
		const { character } = this.props;

		return (
			<div className={`column character-sheet ${this.props.popout ? 'popout' : ''}`}>
				<div className="character-cancel" onClick={e => this.abortEditSheet()}>
					CANCEL
				</div>
				<div className="character-edit" onClick={e => this.saveSheet()}>
					SAVE
				</div>
				<textarea
					rows={40}
					value={this.state.newCharacter}
					onChange={e => this.setState({ ...this.state, newCharacter: e.target.value })}
				/>
			</div>
		);
	}

	saveSheet(): void {
		const newCharacter = JSON.parse(this.state.newCharacter);
		this.props.updateNonPlayerCharacter(newCharacter.id, newCharacter);
		this.props.abortEditNonPlayerCharacter(this.props.character.id);
	}

	abortEditSheet(): void {
		this.props.abortEditNonPlayerCharacter(this.props.character.id);
	}
}
