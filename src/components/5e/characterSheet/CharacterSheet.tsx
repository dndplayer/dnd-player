import React, { ReactNode, ReactElement } from 'react';

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import FirebaseConfig from '../../firebase-config.json';

import { DiceRoll } from 'rpg-dice-roller';
import { RollData, ChatMessageData } from '../../../models/ChatMessage';
import AbilityScore from './AbilityScore';
import AbilitySave from './AbilitySave';

import './CharacterSheet.css';
import { Character } from '../Character';
import Skill from './Skill';
import ProficiencyBonus from './ProficiencyBonus';
import Speed from './Speed';
import Initiative from './Initiative';
import ArmorClass from './ArmorClass';
import HitPoints from './HitPoints';
import Attacks from './Attacks';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
}
interface State {}

export default class CharacterSheet extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	// private chatRoom: firebase.firestore.CollectionReference;

	// private cleanup: () => void;

	render(): ReactNode {
		const {} = this.props;

		const character: Character = {
			name: 'Garrick Crownguard',
			size: 'M',
			strength: 25,
			dexterity: 12,
			constitution: 18,
			intelligence: 9,
			wisdom: 12,
			charisma: 12,
			ac: 19,
			hp: 41,
			maxHp: 87,
			hitDice: 8,
			speed: {
				walk: 30,
				climb: 0,
				fly: 0
			},
			proficiencies: {
				saves: {
					strength: 1,
					constitution: 1
				},
				skills: {
					athletics: 2,
					insight: 1,
					intimidation: 1,
					perception: 1
				}
			},
			levels: [
				{
					className: 'Fighter',
					level: 8
				}
			]
		};

		return (
			<div className="column character-sheet">
				<div className="row character-details">
					<div className="character-name">{character.name}</div>
					<div className="character-classes">
						{character.levels.map(x => `${x.className} ${x.level}`).join(', ')}
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
					</div>
				</div>
			</div>
		);
	}

	componentDidMount(): void {}
	componentWillUnmount(): void {}
}
