import React, { ReactNode } from 'react';

import { DiceRoll } from 'rpg-dice-roller';
import { RollData, ChatMessageData } from '../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheet.module.scss';
import { NonPlayerCharacterSkill, NonPlayerCharacter } from '../../../models/Character';
import Rules from '../../../5eRules';
import Rollable from '../../Rollable';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	skill: NonPlayerCharacterSkill;
	character: NonPlayerCharacter;
}

export default class Skill extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	render(): ReactNode {
		const { skill } = this.props;
		const skillName = Rules.getLongSkillName(skill.skill);

		return (
			<div className={css.skill}>
				<span style={{ marginRight: '4px' }}>{skillName}</span>
				<Rollable showAdvantage onClick={this.handleClick}>
					{skill.modifier >= 0 ? `+${skill.modifier}` : skill.modifier}
				</Rollable>
			</div>
		);
	}

	handleClick(advantage: number): void {
		const modifier = this.props.skill.modifier;
		const modifierStr = (modifier < 0 ? '' : '+') + modifier;
		const roll = new DiceRoll('d20' + modifierStr);
		const stat = Rules.getLongSkillName(this.props.skill.skill);

		const data: RollData = {
			type: 'roll',
			characterName: this.props.character.name,
			rollType: 'Skill',
			rollName: stat,
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
		}

		this.props.sendMessage('', data);
	}
}
