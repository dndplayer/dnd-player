import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../../models/ChatMessage';

import css from './PlayerCharacterSheetEditor.module.scss';
import {
	Character,
	PlayerCharacter,
	CharacterSize,
	CharacterSpell
} from '../../../../models/Character';
import { Upload } from '../../../../../models/Upload';
import CharacterImage from '../../CharacterImage';
import Icon from '@mdi/react';
import { mdiCancel, mdiContentSave } from '@mdi/js';
import AbilityScoreEditorContainer from './AbilityScoreEditorContainer';
import MoneyEditorContainer from './MoneyEditorContainer';
import LevelsEditor from './LevelEditor';
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
	spells: CharacterSpell[];
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
			<div className={`${css.column} ${css.characterSheet} 'popout'}`}>
				<div className={css.characterImageContainer}>
					<CharacterImage
						imageUrl={
							this.props.image ? this.props.image.downloadUrl : newCharacter.imageRef
						}
						character={newCharacter}
						characterId={newCharacter.id}
						updateCharacter={this.props.updatePlayerCharacter}
					/>
				</div>
				<div className={css.row}>
					<input
						className={css.name}
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
				<div className={css.row}>
					<div className={css.columnCenter}>
						<span className={css.label}>Size</span>
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
					</div>
					<div className={css.columnCenter}>
						<span className={css.label}>Race</span>
						<input
							value={newCharacter.race}
							placeholder="Race"
							onChange={e => this.update('race', e.target.value)}
						/>
					</div>
					<div className={css.columnCenter}>
						<span className={css.label}>Alignment</span>
						<input
							value={newCharacter.alignment}
							placeholder="Alignment"
							onChange={e => this.update('alignment', e.target.value)}
						/>
					</div>
					<div className={css.columnCenter}>
						<LevelsEditor character={newCharacter} updateCharacterProperty={update} />
					</div>
				</div>
				<hr />
				<div className={css.columnCenter}>
					<AbilityScoreEditorContainer
						character={newCharacter}
						updateCharacterProperty={update}
					/>
					<div className={css.row}>
						<div className={css.columnCenter}>
							<span className={css.label}>HP</span>
							<div className={css.row}>
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
						</div>
						<div className={css.columnCenter}>
							<span className={css.label}>Hit dice</span>
							<input
								value={newCharacter.hitDice}
								type="number"
								placeholder="10"
								onChange={e => this.update('hitDice', e.target.value)}
							/>
						</div>
						<div className={css.columnCenter}>
							<span className={css.label}>AC</span>
							<input
								value={newCharacter.ac}
								type="number"
								placeholder="20"
								onChange={e => this.update('ac', e.target.value)}
							/>
						</div>
					</div>
					<SkillsEditor character={newCharacter} updateCharacterProperty={update} />
				</div>
				<span className={css.subtitle}>Equipment</span>
				<EquipmentEditor character={newCharacter} updateCharacterProperty={update} />
				<span className={css.subtitle}>Spellcasting</span>
				<SpellsEditor
					character={newCharacter}
					updateCharacterProperty={update}
					lookup={this.props.spells}
				/>
				<SpellSlotEditorContainer
					character={newCharacter}
					updateCharacterProperty={update}
				/>
				<span className={css.subtitle}>Innate Actions</span>
				<AttacksEditor character={newCharacter} updateCharacterProperty={update} />
				<span className={css.subtitle}>Traits</span>
				<TraitsEditor character={newCharacter} updateCharacterProperty={update} />
				<span className={css.subtitle}>Resources</span>
				<ResourcesEditor character={newCharacter} updateCharacterProperty={update} />
				<MoneyEditorContainer character={newCharacter} updateCharacterProperty={update} />
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
