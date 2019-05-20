import React, { ReactNode } from 'react';

import { DiceRoll } from 'rpg-dice-roller';
import { RollData, ChatMessageData } from '../../../../models/ChatMessage';

import css from './PlayerCharacterSheet.module.scss';
import { PlayerCharacter } from '../../../models/Character';
import Rules from '../../../5eRules';
import { ProficiencyClassMap } from './PlayerCharacterSheet';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	skill: string;
	ability: string;
	character: PlayerCharacter;
}

export default class Skill extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {};

		this.handleClick = this.handleClick.bind(this);
	}

	render(): ReactNode {
		const { ability, character, skill } = this.props;
		const skills = character.skills || {};
		const modifier = Rules.getSkillModifier(character, skill, ability);
		const proficiencyClass = ProficiencyClassMap[skills[skill] || 0];

		return (
			<div className={css.skill} onClick={e => this.handleClick(e, 0)}>
				<div className={css.popupAdvantage} onClick={e => this.handleClick(e, 1)}>
					A
				</div>
				<div className={css.popupDisadvantage} onClick={e => this.handleClick(e, -1)}>
					D
				</div>
				<div className={css.skillWrapper}>
					<div className={`${css.skillProficiency}${proficiencyClass}`} />
					<div className={css.skillAbility}>{Rules.getShortAbilityName(ability)}</div>
					<div className={css.skillTitle}>{Rules.getLongSkillName(skill)}</div>
					<div className={css.skillModifier}>
						<div className={css.skillSymbol}>{modifier < 0 ? '-' : '+'}</div>
						<div className={css.skillNumber}>{Math.abs(modifier)}</div>
					</div>
				</div>
			</div>
		);
	}

	handleClick(e, advantage: number): void {
		const modifier = Rules.getSkillModifier(
			this.props.character,
			this.props.skill,
			this.props.ability
		);
		const modifierStr = (modifier < 0 ? '' : '+') + modifier;
		const roll = new DiceRoll('d20' + modifierStr);

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
