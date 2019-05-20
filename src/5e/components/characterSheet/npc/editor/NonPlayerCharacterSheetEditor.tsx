import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheetEditor.module.css';
import { Character, NonPlayerCharacter, CharacterSize } from '../../../../models/Character';
import { Upload } from '../../../../../models/Upload';
import CharacterImage from '../../CharacterImage';
import SkillsEditor from './SkillsEditor';
import { Icon } from '@mdi/react';
import { mdiCancel, mdiContentSave } from '@mdi/js';
import AbilityScoreEditorContainer from './AbilityScoreEditorContainer';
import SpeedsEditor from './SpeedsEditor';
import SensesEditor from './SensesEditor';
import SavesEditor from './SavesEditor';
import TraitsEditor from './TraitsEditor';
import ActionsEditor from './ActionsEditor';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updateNonPlayerCharacter: (characterId: string, character: Character) => void;
	abortEditNonPlayerCharacter: (characterId: string) => void;
	character: NonPlayerCharacter;
	characterId: string;
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
			<div className="column character-sheet popout">
				<div className={`column ${css.characterSheet} popout`}>
					<div className={css.characterImageContainer}>
						<CharacterImage
							imageUrl={
								this.props.image
									? this.props.image.downloadUrl
									: newCharacter.imageRef
							}
							character={newCharacter}
							characterId={this.props.characterId}
							updateCharacter={this.props.updateNonPlayerCharacter}
						/>
					</div>

					<div className={css.characterName + ' row'}>
						<input
							value={newCharacter.name}
							placeholder="Name"
							onChange={(e): void => this.update('name', e.target.value)}
						/>
						<div onClick={(): void => this.abortEditSheet()} className={css.button}>
							<Icon path={mdiCancel} size={1} color={'#a6792d'} />
						</div>
						<div onClick={(): void => this.saveSheet()} className={css.button}>
							<Icon path={mdiContentSave} size={1} color={'#a6792d'} />
						</div>
					</div>
					<div className={css.characterType}>
						<select
							value={newCharacter.size}
							placeholder="Size"
							onChange={(e): void => this.update('size', e.target.value)}
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
							onChange={(e): void => this.update('class', e.target.value)}
						/>
						<input
							value={newCharacter.alignment}
							placeholder="Alignment"
							onChange={(e): void => this.update('alignment', e.target.value)}
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
								onChange={(e): void => this.update('ac', e.target.value || 0)}
							/>
							<input
								value={newCharacter.acType}
								placeholder="natural armor"
								onChange={(e): void => this.update('acType', e.target.value)}
							/>
						</span>
					</div>
					<div>
						<span className={css.boldHeading}>Hit Points</span>
						<span>
							<input
								value={newCharacter.hpDice}
								placeholder="8d10 + 40"
								onChange={(e): void => this.update('hpDice', e.target.value)}
							/>
						</span>
					</div>
					<SpeedsEditor updateCharacterProperty={update} character={newCharacter} />
					<hr className={css.divider} />
					<AbilityScoreEditorContainer
						updateCharacterProperty={update}
						character={newCharacter}
					/>
					<hr className={css.divider} />
					<SavesEditor updateCharacterProperty={update} character={newCharacter} />
					<SkillsEditor updateCharacterProperty={update} character={newCharacter} />
					<div>
						<span className={css.boldHeading}>Damage Resistances</span>
						<input
							value={newCharacter.damageResistances}
							placeholder="cold"
							onChange={(e): void => this.update('damageResistances', e.target.value)}
						/>
					</div>
					<div>
						<span className={css.boldHeading}>Damage Immunities</span>
						<input
							value={newCharacter.damageImmunities}
							placeholder="cold"
							onChange={(e): void => this.update('damageImmunities', e.target.value)}
						/>
					</div>
					<div>
						<span className={css.boldHeading}>Condition Immunities</span>
						<input
							value={newCharacter.conditionImmunities}
							placeholder="poisoned"
							onChange={(e): void =>
								this.update('conditionImmunities', e.target.value)
							}
						/>
					</div>
					<SensesEditor updateCharacterProperty={update} character={newCharacter} />
					<div>
						<span className={css.boldHeading}>Languages</span>
						<input
							value={newCharacter.languages}
							placeholder="Common"
							onChange={(e): void => this.update('languages', e.target.value)}
						/>
					</div>
					<div>
						<span className={css.boldHeading}>Challenge</span>
						<input
							value={newCharacter.cr}
							placeholder="1/2"
							onChange={(e): void => this.update('cr', e.target.value)}
						/>
					</div>
					<hr className={css.divider} />
					<TraitsEditor updateCharacterProperty={update} character={newCharacter} />
					<div className={css.subheading}>Actions</div>
					<ActionsEditor
						updateCharacterProperty={update}
						character={newCharacter}
						actionProperty="actions"
					/>
					<div className={css.subheading}>Reactions</div>
					<ActionsEditor
						updateCharacterProperty={update}
						character={newCharacter}
						actionProperty="reactions"
					/>
					<div className={css.subheading}>Legendary Actions</div>
					<label>Number of legendary actions:</label>
					<input
						value={newCharacter.legendaryActionCount}
						type="number"
						min={1}
						onChange={(e): void => this.update('legendaryActionCount', e.target.value)}
					/>
					<ActionsEditor
						updateCharacterProperty={update}
						character={newCharacter}
						actionProperty="legendaryActions"
					/>
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
		this.props.updateNonPlayerCharacter(this.props.characterId, this.state.newCharacter);
		this.props.abortEditNonPlayerCharacter(this.props.characterId);
	}

	abortEditSheet(): void {
		this.props.abortEditNonPlayerCharacter(this.props.characterId);
	}
}
