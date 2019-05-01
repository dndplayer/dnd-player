import React, { ReactNode } from 'react';

import { DiceRoll } from 'rpg-dice-roller';
import { RollData, ChatMessageData } from '../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheet.module.css';
import { NonPlayerCharacterSkill, NonPlayerCharacter } from '../../../models/Character';
import Rules from '../../../5eRules';

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
		const { skill, character } = this.props;
		const skillName = Rules.getLongSkillName(skill.skill);

		return (
			<div className={css.skill} onClick={e => this.handleClick(e, 0)}>
				<span>{skillName}</span>
				<div className={css.rollable}>
					<div className={css.popupAdvantage} onClick={e => this.handleClick(e, 1)}>
						A
					</div>
					<div className={css.popupDisadvantage} onClick={e => this.handleClick(e, -1)}>
						D
					</div>
					{skill.modifier >= 0 ? `+${skill.modifier}` : skill.modifier}
				</div>
			</div>
		);
	}

	handleClick(e, advantage: number): void {
		const modifier = this.props.skill.modifier;
		const modifierStr = (modifier < 0 ? '' : '+') + modifier;
		const roll = new DiceRoll('d20' + modifierStr);
		const stat = Rules.getLongSkillName(this.props.skill.skill);

		const data: RollData = {
			type: 'roll',
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
			e.stopPropagation();
		}

		this.props.sendMessage('', data);
	}
}
