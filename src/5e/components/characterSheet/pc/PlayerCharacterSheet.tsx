import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';
import AbilityScore from './AbilityScore';
import AbilitySave from './AbilitySave';

import './PlayerCharacterSheet.css';
import { Character, PlayerCharacter } from '../../../models/Character';
import Skill from './Skill';
import ProficiencyBonus from './ProficiencyBonus';
import Speed from './Speed';
import Initiative from './Initiative';
import ArmorClass from './ArmorClass';
import HitPoints from './HitPoints';
import Attacks from './Attacks';
import Equipment from './Equipment';
import CharacterImage from './../CharacterImage';
import { Upload } from '../../../../models/Upload';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	closeCharacterSheet: (characterId: string) => void;
	updatePlayerCharacter: (characterId: string, character: Character) => void;
	character: PlayerCharacter;
	popout?: string;
	image: Upload;
}
interface State {
	editing: boolean;
	newCharacter: string;
}

export const ProficiencyClassMap = {
	0: 'none',
	0.5: 'half-proficienct',
	1: 'proficient',
	2: 'expertise'
};

export default class PlayerCharacterSheet extends React.Component<Props, State> {
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
			<div className={`column character-sheet ${this.props.popout ? 'popout' : ''}`}>
				<div className="character-close" onClick={e => this.closeSheet()}>
					X
				</div>
				<div className="character-edit" onClick={e => this.editSheet()}>
					EDIT
				</div>
				<div className="character-popout" onClick={e => this.popoutSheet()}>
					POPOUT
				</div>
				<div className="row character-details">
					<div className="character-name">{character.name}</div>
					<div className="character-image">
						<CharacterImage
							imageUrl={this.props.image ? this.props.image.downloadUrl : null}
							character={character}
							updateCharacter={this.props.updatePlayerCharacter}
						/>
					</div>
					<div className="character-classes">
						{(character.levels || []).map(x => `${x.className} ${x.level}`).join(', ')}
					</div>
				</div>
				<div className="row">
					<div className="ability-container">
						<AbilityScore ability="strength" character={character} {...this.props} />
						<AbilityScore ability="dexterity" character={character} {...this.props} />
						<AbilityScore
							ability="constitution"
							character={character}
							{...this.props}
						/>
						<AbilityScore
							ability="intelligence"
							character={character}
							{...this.props}
						/>
						<AbilityScore ability="wisdom" character={character} {...this.props} />
						<AbilityScore ability="charisma" character={character} {...this.props} />
					</div>
					<ProficiencyBonus character={character} {...this.props} />
					<Speed character={character} {...this.props} />
					<HitPoints character={character} {...this.props} />
				</div>
				<div className="row">
					<div className="column">
						<div className="save-container">
							<AbilitySave ability="strength" character={character} {...this.props} />
							<AbilitySave
								ability="dexterity"
								character={character}
								{...this.props}
							/>
							<AbilitySave
								ability="constitution"
								character={character}
								{...this.props}
							/>
							<AbilitySave
								ability="intelligence"
								character={character}
								{...this.props}
							/>
							<AbilitySave ability="wisdom" character={character} {...this.props} />
							<AbilitySave ability="charisma" character={character} {...this.props} />
							<div className="section-title">Saving Throws</div>
						</div>
					</div>
					<div className="skill-container">
						<Skill
							skill="acrobatics"
							ability="dexterity"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="animalHandling"
							ability="wisdom"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="arcana"
							ability="intelligence"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="athletics"
							ability="strength"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="deception"
							ability="charisma"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="history"
							ability="intelligence"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="insight"
							ability="wisdom"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="intimidation"
							ability="charisma"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="investigation"
							ability="intelligence"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="medicine"
							ability="wisdom"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="nature"
							ability="intelligence"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="perception"
							ability="wisdom"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="performance"
							ability="charisma"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="persuasion"
							ability="charisma"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="religion"
							ability="intelligence"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="sleightOfHand"
							ability="dexterity"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="stealth"
							ability="dexterity"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="survival"
							ability="wisdom"
							character={character}
							{...this.props}
						/>
						<div className="section-title">Skills</div>
					</div>
					<div className="column" style={{ flex: 1 }}>
						<div className="row">
							<Initiative character={character} {...this.props} />
							<ArmorClass character={character} {...this.props} />
						</div>
						<div className="row">
							<Attacks character={character} {...this.props} />
						</div>
						<div className="row">
							<Equipment character={character} {...this.props} />
						</div>
					</div>
				</div>
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
		this.props.updatePlayerCharacter(newCharacter.id, newCharacter);
		this.setState({
			...this.state,
			editing: false
		});
	}

	popoutSheet(): void {
		window.open(
			`/characterSheet/${this.props.character.id}`,
			'popupWindow',
			'height=768,width=1024,toolbar=no,location=no,statusbar=no,titlebar=no,directories=no',
			false
		);
		this.closeSheet();
	}
}
