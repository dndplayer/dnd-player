import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';
import AbilityScore from './AbilityScore';
import AbilitySave from './AbilitySave';

import css from './PlayerCharacterSheet.module.scss';
import { Character, PlayerCharacter, CharacterSpell } from '../../../models/Character';
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
import { mdiPencil } from '@mdi/js';
import Icon from '@mdi/react';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updatePlayerCharacter: (characterId: string, character: Character) => void;
	editPlayerCharacter: (characterId: string) => void;
	character: PlayerCharacter;
	image: Upload;
	inline?: boolean;
	spells: CharacterSpell[];
}

export const ProficiencyClassMap = {
	0: css.none,
	0.5: css.halfProficient,
	1: css.proficient,
	2: css.expertise
};

export default class PlayerCharacterSheet extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {
			newCharacter: JSON.stringify(this.props.character, undefined, ' ')
		};
	}

	render(): ReactNode {
		const { character, editPlayerCharacter, inline } = this.props;

		return (
			<div className={`column ${css.characterSheet} ${inline ? 'inline' : ''} popout`}>
				<div className={css.row}>
					<div className={css.characterName}>{character.name}</div>
					<div onClick={() => editPlayerCharacter(character.id)} className={css.button}>
						<Icon path={mdiPencil} size={1} color={'#a6792d'} />
					</div>
				</div>
				<div className={css.row}>
					<div className={css.characterType}>
						{Rules.getSizeName(character.size)} {character.race}{' '}
						{(character.levels || [])
							.map(x => `${Rules.classNameMap[x.className]} ${x.level}`)
							.join(', ')}
						, {character.alignment}
					</div>
				</div>
				<div className={`${css.row} ${css.characterDetails}`}>
					<div className={css.characterImage} style={{ float: 'right' }}>
						<CharacterImage
							imageUrl={
								this.props.image ? this.props.image.downloadUrl : character.imageRef
							}
							character={character}
							characterId={character.id}
							updateCharacter={this.props.updatePlayerCharacter}
						/>
					</div>
				</div>
				<hr />
				<div className={css.row}>
					<div className={css.abilityContainer}>
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
				<div className={css.row}>
					<div className={css.column}>
						<div className={css.saveContainer}>
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
					<div className={css.column}>
						<div className={css.skillContainer}>
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
							<div className={css.sectionTitle}>Skills</div>
						</div>
					</div>
					<div className={css.column} style={{ flex: 1 }}>
						<div className={css.row}>
							<Initiative character={character} {...this.props} />
							<ArmorClass character={character} {...this.props} />
						</div>
						<div className={css.row}>
							<Attacks character={character} {...this.props} />
						</div>
						<div className={css.row}>
							<Equipment character={character} {...this.props} />
						</div>
						<div className={css.row}>
							<Resources character={character} {...this.props} />
						</div>
					</div>
				</div>
				<div className={css.row}>
					<Traits character={character} {...this.props} />
				</div>
				<div>
					<Spells character={character} {...this.props} />
				</div>
			</div>
		);
	}
}
