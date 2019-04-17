import React, { ReactNode, ReactElement } from 'react';

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import FirebaseConfig from '../../firebase-config.json';

import { DiceRoll } from 'rpg-dice-roller';
import { RollData, ChatMessageData } from '../../models/ChatMessage';
import AbilityScore from './AbilityScore';
import AbilitySave from './AbilitySave';

import './CharacterSheet.css';
import { Character } from '../../models/Character';
import Skill from './Skill';

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
			name: 'Aaron Duckbill',
			size: 'M',
			str: 25,
			dex: 13,
			con: 16,
			int: 8,
			wis: 12,
			cha: 10,
			proficiencyBonus: 3,
			proficiencies: {
				saves: {
					str: 1,
					con: 2,
					dex: 0.5
				},
				skills: {
					Athletics: 1,
					Intimidation: 1,
					Nature: 2,
					Perception: 0.5
				}
			}
		};

		return (
			<div>
				<div className="ability-container">
					<AbilityScore ability="str" character={character} {...this.props} />
					<AbilityScore ability="dex" character={character} {...this.props} />
					<AbilityScore ability="con" character={character} {...this.props} />
					<AbilityScore ability="int" character={character} {...this.props} />
					<AbilityScore ability="wis" character={character} {...this.props} />
					<AbilityScore ability="cha" character={character} {...this.props} />
				</div>
				<div className="row">
					<div className="column">
						<div className="save-container">
							<AbilitySave ability="str" character={character} {...this.props} />
							<AbilitySave ability="dex" character={character} {...this.props} />
							<AbilitySave ability="con" character={character} {...this.props} />
							<AbilitySave ability="int" character={character} {...this.props} />
							<AbilitySave ability="wis" character={character} {...this.props} />
							<AbilitySave ability="cha" character={character} {...this.props} />
							<div className="section-title">Saving Throws</div>
						</div>
					</div>
					<div className="skill-container">
						<Skill
							skill="Acrobatics"
							ability="dex"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="Animal Handling"
							ability="wis"
							character={character}
							{...this.props}
						/>
						<Skill skill="Arcana" ability="int" character={character} {...this.props} />
						<Skill
							skill="Athletics"
							ability="str"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="Deception"
							ability="cha"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="History"
							ability="int"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="Insight"
							ability="wis"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="Intimidation"
							ability="cha"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="Investigation"
							ability="int"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="Medicine"
							ability="wis"
							character={character}
							{...this.props}
						/>
						<Skill skill="Nature" ability="int" character={character} {...this.props} />
						<Skill
							skill="Perception"
							ability="wis"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="Performance"
							ability="cha"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="Persuasion"
							ability="cha"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="Religion"
							ability="int"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="Sleight of Hand"
							ability="dex"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="Stealth"
							ability="dex"
							character={character}
							{...this.props}
						/>
						<Skill
							skill="Survival"
							ability="wis"
							character={character}
							{...this.props}
						/>
						<div className="section-title">Skills</div>
					</div>
				</div>
			</div>
		);
	}

	componentDidMount(): void {}
	componentWillUnmount(): void {}
}
