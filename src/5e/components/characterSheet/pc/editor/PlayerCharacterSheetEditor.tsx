import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../../models/ChatMessage';

import css from './PlayerCharacterSheetEditor.module.css';
import { Character, PlayerCharacter } from '../../../../models/Character';
import { Upload } from '../../../../../models/Upload';
import CharacterImage from '../../CharacterImage';
import Icon from '@mdi/react';
import { mdiCancel, mdiContentSave } from '@mdi/js';
import AbilityScoreEditorContainer from './AbilityScoreEditorContainer';
import MoneyEditorContainer from './MoneyEditorContainer';
import LevelsEditor from './LevelEditor';
import SavesEditor from './SavesEditor';
import SkillsEditor from './SkillsEditor';
import SpellsEditor from './SpellsEditor';
import SpellSlotEditorContainer from './SpellSlotEditorContainer';
import TraitsEditor from './TraitsEditor';
import AttacksEditor from './AttacksEditor';
import EquipmentEditor from './EquipmentEditor';
import ResourcesEditor from './ResourcesEditor';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updatePlayerCharacter: (characterId: string, character: Character) => void;
	abortEditPlayerCharacter: (characterId: string) => void;
	character: PlayerCharacter;
	popout?: string;
	image: Upload;
}
interface State {
	newCharacter: PlayerCharacter;
}

export default class PlayerCharacterSheetEditor extends React.Component<Props, State> {
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
			<div className={`${css.column} character-sheet ${this.props.popout ? 'popout' : ''}`}>
				<div className={`${css.column} ${css.characterSheet} 'popout'}`}>
					<div className={css.characterImageContainer}>
						<CharacterImage
							imageUrl={
								this.props.image
									? this.props.image.downloadUrl
									: newCharacter.imageRef
							}
							character={newCharacter}
							updateCharacter={this.props.updatePlayerCharacter}
						/>
					</div>
					<div onClick={() => this.abortEditSheet()} className={css.button}>
						<Icon path={mdiCancel} size={1} color={'#a6792d'} />
					</div>
					<div onClick={() => this.saveSheet()} className={css.button}>
						<Icon path={mdiContentSave} size={1} color={'#a6792d'} />
					</div>
					<div className={css.column}>
						<input
							value={newCharacter.name}
							placeholder="Name"
							onChange={e => this.update('name', e.target.value)}
						/>
						<LevelsEditor character={newCharacter} updateCharacterProperty={update} />
						<AbilityScoreEditorContainer
							character={newCharacter}
							updateCharacterProperty={update}
						/>
						<div className={css.row}>
							<span>HP:</span>
							<input
								value={newCharacter.hp}
								type="number"
								placeholder="10"
								onChange={e => this.update('hp', e.target.value)}
							/>
							/
							<input
								value={newCharacter.maxHp}
								type="number"
								placeholder="20"
								onChange={e => this.update('maxHp', e.target.value)}
							/>
						</div>
						<div className={css.row}>
							<span>Hit dice:</span>
							<input
								value={newCharacter.hitDice}
								type="number"
								placeholder="10"
								onChange={e => this.update('hitDice', e.target.value)}
							/>
						</div>
						<div className={css.row}>
							<span>AC:</span>
							<input
								value={newCharacter.ac}
								type="number"
								placeholder="20"
								onChange={e => this.update('ac', e.target.value)}
							/>
						</div>
						<SavesEditor character={newCharacter} updateCharacterProperty={update} />
						<SkillsEditor character={newCharacter} updateCharacterProperty={update} />
					</div>
					<EquipmentEditor character={newCharacter} updateCharacterProperty={update} />
					<SpellsEditor character={newCharacter} updateCharacterProperty={update} />
					<SpellSlotEditorContainer
						character={newCharacter}
						updateCharacterProperty={update}
					/>
					<AttacksEditor character={newCharacter} updateCharacterProperty={update} />
					<TraitsEditor character={newCharacter} updateCharacterProperty={update} />
					<ResourcesEditor character={newCharacter} updateCharacterProperty={update} />
					<MoneyEditorContainer
						character={newCharacter}
						updateCharacterProperty={update}
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
		this.props.updatePlayerCharacter(this.props.character.id, this.state.newCharacter);
		this.props.abortEditPlayerCharacter(this.props.character.id);
	}

	abortEditSheet(): void {
		this.props.abortEditPlayerCharacter(this.props.character.id);
	}
}
