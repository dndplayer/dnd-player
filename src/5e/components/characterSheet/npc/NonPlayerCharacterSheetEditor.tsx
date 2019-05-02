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
import { Icon } from '@mdi/react';
import { mdiCancel, mdiContentSave } from '@mdi/js';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updateNonPlayerCharacter: (characterId: string, character: Character) => void;
	abortEditNonPlayerCharacter: (characterId: string) => void;
	character: NonPlayerCharacter;
	popout?: string;
	image: Upload;
}
interface State {
	character: NonPlayerCharacter;
}

export default class NonPlayerCharacterSheetEditor extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			character: { ...this.props.character }
		};
	}

	render(): ReactNode {
		const { character } = this.state;

		return (
			<div className={`column character-sheet ${this.props.popout ? 'popout' : ''}`}>
				<div className={`column ${css.characterSheet} 'popout'}`}>
					<div className={css.characterImageContainer}>
						<CharacterImage
							imageUrl={this.props.image ? this.props.image.downloadUrl : null}
							character={character}
							updateCharacter={this.props.updateNonPlayerCharacter}
						/>
					</div>

					<div className={css.characterName}>
						<input
							value={character.name}
							placeholder="Name"
							onChange={e => this.update('name', e.target.value)}
						/>
						<span onClick={() => this.abortEditSheet()} style={{ margin: '0 8px' }}>
							<Icon path={mdiCancel} size={1} color={'#a6792d'} />
						</span>
						<span onClick={() => this.saveSheet()} style={{ margin: '0 8px' }}>
							<Icon path={mdiContentSave} size={1} color={'#a6792d'} />
						</span>
					</div>
					<div className={css.characterType}>
						<input
							value={character.class}
							placeholder="Class"
							onChange={e => this.update('class', e.target.value)}
						/>
						<input
							value={character.alignment}
							placeholder="Alignment"
							onChange={e => this.update('alignment', e.target.value)}
						/>
					</div>
					<hr className={css.divider} />
					<div>
						<span className={css.boldHeading}>Armor Class</span>
						<span>
							<input
								value={character.ac}
								type="number"
								min="0"
								onChange={e => this.update('ac', e.target.value || 0)}
							/>
							<input
								value={character.acType}
								placeholder="natural armor"
								onChange={e => this.update('acType', e.target.value)}
							/>
						</span>
					</div>
					<div>
						<span className={css.boldHeading}>Hit Points</span>
						<span>
							<input
								value={character.hpDice}
								placeholder="8d10 + 40"
								onChange={e => this.update('hpDice', e.target.value)}
							/>
						</span>
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
			</div>
		);
	}

	update(prop: string, value: any): void {
		const newObj = {
			...this.state,
			character: {
				...this.state.character
			}
		};

		newObj.character[prop] = value;

		this.setState(newObj);
	}

	saveSheet(): void {
		this.props.updateNonPlayerCharacter(this.props.character.id, this.state.character);
		this.props.abortEditNonPlayerCharacter(this.props.character.id);
	}

	abortEditSheet(): void {
		this.props.abortEditNonPlayerCharacter(this.props.character.id);
	}
}
