import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';

import css from './PlayerCharacterSheet.module.scss';
import { PlayerCharacter } from '../../../models/Character';
import Rules from '../../../5eRules';
import { ProficiencyClassMap } from './PlayerCharacterSheet';
import CharacterActionHelper from '../../../CharacterActionHelper';

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
			<div className={css.skill} onClick={(e): void => this.handleClick(e, 0)}>
				<div className={css.popupAdvantage} onClick={(e): void => this.handleClick(e, 1)}>
					A
				</div>
				<div
					className={css.popupDisadvantage}
					onClick={(e): void => this.handleClick(e, -1)}
				>
					D
				</div>
				<div className={css.skillWrapper}>
					<div className={`${css.skillProficiency} ${proficiencyClass}`} />
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

	handleClick(e: React.MouseEvent, advantage: number): void {
		e.stopPropagation();
		const modifier = Rules.getSkillModifier(
			this.props.character,
			this.props.skill,
			this.props.ability
		);

		CharacterActionHelper.doBasicRoll(
			this.props.character,
			'Skill Check',
			`${Rules.getLongSkillName(this.props.skill)} (${Rules.getLongAbilityName(
				this.props.ability
			)})`,
			modifier,
			advantage,
			this.props.sendMessage
		);
	}
}
