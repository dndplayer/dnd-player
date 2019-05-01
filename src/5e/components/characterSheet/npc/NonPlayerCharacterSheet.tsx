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
	closeCharacterSheet: (characterId: string) => void;
	updateNonPlayerCharacter: (characterId: string, character: Character) => void;
	character: NonPlayerCharacter;
	popout?: string;
	image: Upload;
}
interface State {
	editing: boolean;
	newCharacter: string;
}

export default class NonPlayerCharacterSheet extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			editing: false,
			newCharacter: JSON.stringify(this.props.character, undefined, ' ')
		};
	}

	render(): ReactNode {
		const { character } = this.props;

		if (this.state.editing) {
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
						onChange={e =>
							this.setState({ ...this.state, newCharacter: e.target.value })
						}
					/>
				</div>
			);
		}

		return (
			<div className={`column ${css.characterSheet} ${this.props.popout ? 'popout' : ''}`}>
				<div className="character-close" onClick={e => this.closeSheet()}>
					X
				</div>
				<div className="character-edit" onClick={e => this.editSheet()}>
					EDIT
				</div>
				<div className="character-popout" onClick={e => this.popoutSheet()}>
					POPOUT
				</div>
				<div className={css.characterImageContainer}>
					<CharacterImage
						imageUrl={this.props.image ? this.props.image.downloadUrl : null}
						character={character}
						updateCharacter={this.props.updateNonPlayerCharacter}
					/>
				</div>
				<div className={css.characterName}>{character.name}</div>
				<div className={css.characterType}>
					{character.class}, {character.alignment}
				</div>
				<hr className={css.divider} />
				<div>
					<span className={css.boldHeading}>Armor Class</span>
					<span>
						{character.ac} ({character.acType})
					</span>
				</div>
				<div>
					<span className={css.boldHeading}>Hit Points</span>
					<span>{character.hpDice}</span>
				</div>
				<div>
					<span className={css.boldHeading}>Speed</span>
					<span>{(character.speed && character.speed.walk) || 0} ft.</span>
				</div>
				<hr className={css.divider} />
				<AbilityScoreContainer {...this.props} />
				<hr className={css.divider} />
				<Skills {...this.props} />
				<Senses {...this.props} />
				<div>
					<span className={css.boldHeading}>Languages</span>
					<span>{(character.languages || []).join(', ')}</span>
				</div>
				<div>
					<span className={css.boldHeading}>Challenge</span>
					<span>{character.cr}</span>
				</div>
				<hr className={css.divider} />
				<Features {...this.props} />
				<div className={css.subheading}>Actions</div>
				<Actions {...this.props} />
			</div>
		);
	}

	closeSheet(): void {
		this.props.closeCharacterSheet(this.props.character.id);
	}

	editSheet(): void {
		this.setState({
			...this.state,
			editing: true
		});
	}

	abortEditSheet(): void {
		this.setState({
			...this.state,
			editing: false
		});
	}

	saveSheet(): void {
		const newCharacter = JSON.parse(this.state.newCharacter);
		this.props.updateNonPlayerCharacter(newCharacter.id, newCharacter);
		this.setState({
			...this.state,
			editing: false
		});
	}

	popoutSheet(): void {
		window.open(
			`/characterSheet/${this.props.character.id}`,
			'popupWindow2',
			'height=768,width=1024,toolbar=no,location=no,statusbar=no,titlebar=no,directories=no',
			false
		);
		this.closeSheet();
	}
}
