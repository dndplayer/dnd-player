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
import Rules from '../../../5eRules';
import Spells from './Spells';
import Traits from './Traits';
import Resources from './Resources';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updatePlayerCharacter: (characterId: string, character: Character) => void;
	editPlayerCharacter: (characterId: string) => void;
	character: PlayerCharacter;
	popout?: string;
	image: Upload;
}

export const ProficiencyClassMap = {
	0: 'none',
	0.5: 'half-proficienct',
	1: 'proficient',
	2: 'expertise'
};

export default class PlayerCharacterSheet extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {
			newCharacter: JSON.stringify(this.props.character, undefined, ' ')
		};
	}

	render(): ReactNode {
		const { character, editPlayerCharacter } = this.props;

		return (
			<div className={`column character-sheet ${this.props.popout ? 'popout' : ''}`}>
				<div className="character-edit" onClick={() => editPlayerCharacter(character.id)}>
					EDIT
				</div>
				<div className="row character-details">
					<div className="character-name">{character.name}</div>
					<div className="character-image">
						<CharacterImage
							imageUrl={
								this.props.image ? this.props.image.downloadUrl : character.imageRef
							}
							character={character}
							updateCharacter={this.props.updatePlayerCharacter}
						/>
					</div>
					<div className="character-classes">
						{(character.levels || [])
							.map(x => `${Rules.classNameMap[x.className]} ${x.level}`)
							.join(', ')}
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
						<div className="row">
							<Traits character={character} {...this.props} />
						</div>
						<div className="row">
							<Resources character={character} {...this.props} />
						</div>
					</div>
				</div>
				<div>
					<Spells character={character} {...this.props} />
				</div>
			</div>
		);
	}
}
