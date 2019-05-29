import React, { ReactNode } from 'react';

import { DiceRoll } from 'rpg-dice-roller';
import { RollData, ChatMessageData } from '../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheet.module.scss';
import { NonPlayerCharacterSkill, NonPlayerCharacter } from '../../../models/Character';
import Rules from '../../../5eRules';
import Rollable from '../../Rollable';
import CharacterActionHelper from '../../../CharacterActionHelper';

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
		CharacterActionHelper.doBasicRoll(
			this.props.character,
			'Skill',
			Rules.getLongSkillName(this.props.skill.skill),
			this.props.skill.modifier,
			advantage,
			this.props.sendMessage
		);
	}
}
