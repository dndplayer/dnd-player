import React, { ReactNode, ReactElement } from 'react';

import { DiceRoll } from 'rpg-dice-roller';
import { RollData, ChatMessageData } from '../../models/ChatMessage';

import './CharacterSheet.css';
import { Character } from '../../models/Character';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	skill: string;
	ability: string;
	character: Character;
}
interface State {}

export default class Skill extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};

		this.handleClick = this.handleClick.bind(this);
	}

	// private chatRoom: firebase.firestore.CollectionReference;

	// private cleanup: () => void;

	render(): ReactNode {
		const { ability, character, skill } = this.props;
		const modifier = this.getSkillModifier(character, skill, ability);
		const proficiencyClass =
			character.proficiencies.skills[skill] === 2
				? 'expertise'
				: character.proficiencies.skills[skill] === 1
				? 'proficient'
				: character.proficiencies.skills[skill] === 0.5
				? 'half-proficient'
				: 'none';

		return (
			<div className="skill" onClick={e => this.handleClick(e, 0)}>
				<div className="popup-advantage" onClick={e => this.handleClick(e, 1)}>
					A
				</div>
				<div className="popup-disadvantage" onClick={e => this.handleClick(e, -1)}>
					D
				</div>
				<div className="skill-wrapper">
					<div className={`skill-proficiency ${proficiencyClass}`} />
					<div className="skill-ability">{ability}</div>
					<div className="skill-title">{skill}</div>
					<div className="skill-modifier">
						<div className="skill-symbol">{modifier < 0 ? '-' : '+'}</div>
						<div className="skill-number">{Math.abs(modifier)}</div>
					</div>
				</div>
			</div>
		);
	}

	componentDidMount(): void {}
	componentWillUnmount(): void {}

	getSkillModifier(character: Character, skill: string, ability: string): number {
		const baseModifier = Math.floor((character[ability] - 10) / 2);
		const proficiencyMultiplier = character.proficiencies.skills[skill] || 0;
		return baseModifier + Math.floor(proficiencyMultiplier * character.proficiencyBonus);
	}

	handleClick(e, advantage: number): void {
		const modifier = this.getSkillModifier(
			this.props.character,
			this.props.skill,
			this.props.ability
		);
		const modifierStr = (modifier < 0 ? '' : '+') + modifier;
		const roll = new DiceRoll('d20' + modifierStr);
		const stat = this.props.ability;

		const data: RollData = {
			type: 'roll',
			rollType: 'Skill',
			rollName: `${this.props.skill} (${this.props.ability})`,
			modifier: modifierStr,
			roll1Total: roll.total,
			roll1Details: roll.toString().match(/.*?: (.*?) =/)[1],
			roll1CritSuccess: roll.rolls[0][0] === 20,
			roll1CritFail: roll.rolls[0][0] === 1
		};

		if (advantage) {
			const roll2 = new DiceRoll('d20' + modifierStr);
			data.rollAdvantageType = advantage;
			data.roll2Total = roll2.total;
			data.roll2Details = roll2.toString().match(/.*?: (.*?) =/)[1];
			data.roll2CritSuccess = roll2.rolls[0][0] === 20;
			data.roll2CritFail = roll2.rolls[0][0] === 1;
			e.stopPropagation();
		}

		this.props.sendMessage('', data);
	}
}
