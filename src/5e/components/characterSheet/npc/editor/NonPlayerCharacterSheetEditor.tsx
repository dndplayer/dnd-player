import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheetEditor.module.css';
import { Character, NonPlayerCharacter, CharacterSize } from '../../../../models/Character';
import { Upload } from '../../../../../models/Upload';
import CharacterImage from '../../CharacterImage';
import SkillsEditor from './SkillsEditor';
import Features from '../Features';
import Actions from '../Actions';
import Senses from '../Senses';
import { Icon } from '@mdi/react';
import { mdiCancel, mdiContentSave } from '@mdi/js';
import AbilityScoreEditorContainer from './AbilityScoreEditorContainer';
import SpeedsEditor from './SpeedsEditor';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updateNonPlayerCharacter: (characterId: string, character: Character) => void;
	abortEditNonPlayerCharacter: (characterId: string) => void;
	character: NonPlayerCharacter;
	popout?: string;
	image: Upload;
}
interface State {
	newCharacter: NonPlayerCharacter;
}

export default class NonPlayerCharacterSheetEditor extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			newCharacter: { ...this.props.character }
		};
	}

	render(): ReactNode {
		const { newCharacter } = this.state;
		const update = this.update.bind(this);

		return (
			<div className={`column character-sheet ${this.props.popout ? 'popout' : ''}`}>
				<div className={`column ${css.characterSheet} 'popout'}`}>
					<div className={css.characterImageContainer}>
						<CharacterImage
							imageUrl={this.props.image ? this.props.image.downloadUrl : null}
							character={newCharacter}
							updateCharacter={this.props.updateNonPlayerCharacter}
						/>
					</div>

					<div className={css.characterName + ' row'}>
						<input
							value={newCharacter.name}
							placeholder="Name"
							onChange={e => this.update('name', e.target.value)}
						/>
						<div onClick={() => this.abortEditSheet()} className={css.button}>
							<Icon path={mdiCancel} size={1} color={'#a6792d'} />
						</div>
						<div onClick={() => this.saveSheet()} className={css.button}>
							<Icon path={mdiContentSave} size={1} color={'#a6792d'} />
						</div>
					</div>
					<div className={css.characterType}>
						<select
							value={newCharacter.size}
							placeholder="Class"
							onChange={e => this.update('size', e.target.value)}
						>
							<option value={CharacterSize.Tiny}>Tiny</option>
							<option value={CharacterSize.Small}>Small</option>
							<option value={CharacterSize.Medium}>Medium</option>
							<option value={CharacterSize.Large}>Large</option>
							<option value={CharacterSize.Huge}>Huge</option>
							<option value={CharacterSize.Gargantuan}>Gargantuan</option>
						</select>
						<input
							value={newCharacter.class}
							placeholder="Class"
							onChange={e => this.update('class', e.target.value)}
						/>
						<input
							value={newCharacter.alignment}
							placeholder="Alignment"
							onChange={e => this.update('alignment', e.target.value)}
						/>
					</div>
					<hr className={css.divider} />
					<div>
						<span className={css.boldHeading}>Armor Class</span>
						<span>
							<input
								value={newCharacter.ac}
								type="number"
								min="0"
								onChange={e => this.update('ac', e.target.value || 0)}
							/>
							<input
								value={newCharacter.acType}
								placeholder="natural armor"
								onChange={e => this.update('acType', e.target.value)}
							/>
						</span>
					</div>
					<div>
						<span className={css.boldHeading}>Hit Points</span>
						<span>
							<input
								value={newCharacter.hpDice}
								placeholder="8d10 + 40"
								onChange={e => this.update('hpDice', e.target.value)}
							/>
						</span>
					</div>
					<div>
						<span className={css.boldHeading}>Speed</span>
						<SpeedsEditor updateCharacterProperty={update} character={newCharacter} />
					</div>
					<hr className={css.divider} />
					<AbilityScoreEditorContainer
						updateCharacterProperty={update}
						character={newCharacter}
					/>
					<hr className={css.divider} />
					<SkillsEditor updateCharacterProperty={update} character={newCharacter} />
					<Senses {...this.props} />
					<div>
						<span className={css.boldHeading}>Languages</span>
						<span>{(newCharacter.languages || []).join(', ')}</span>
					</div>
					<div>
						<span className={css.boldHeading}>Challenge</span>
						<span>{newCharacter.cr}</span>
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
		this.setState(prevState => {
			const newObj = { newCharacter: { ...prevState.newCharacter } };
			newObj.newCharacter[prop] = value;
			return newObj;
		});
	}

	saveSheet(): void {
		this.props.updateNonPlayerCharacter(this.props.character.id, this.state.newCharacter);
		this.props.abortEditNonPlayerCharacter(this.props.character.id);
	}

	abortEditSheet(): void {
		this.props.abortEditNonPlayerCharacter(this.props.character.id);
	}
}
