import React, { ReactNode } from 'react';

import { DiceRoll } from 'rpg-dice-roller';
import { RollData, ChatMessageData } from '../../../../models/ChatMessage';

import css from './PlayerCharacterSheet.module.scss';
import { Character } from '../../../models/Character';
import Rules from '../../../5eRules';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	ability: string;
	character: Character;
}

export default class AbilityScore extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {};

		this.handleClick = this.handleClick.bind(this);
	}

	render(): ReactNode {
		const { ability, character } = this.props;
		const modifier = Rules.getAbilityModifier(character, ability);

		return (
			<div className={css.ability} onClick={e => this.handleClick(e, 0)}>
				<div className={css.popupAdvantage} onClick={e => this.handleClick(e, 1)}>
					A
				</div>
				<div className={css.popupDisadvantage} onClick={e => this.handleClick(e, -1)}>
					D
				</div>
				<div className={css.abilityTitle}>{Rules.getLongAbilityName(ability)}</div>
				<div className={css.abilityModifier}>
					<div className={css.abilitySymbol}>{modifier < 0 ? '-' : '+'}</div>
					<div className={css.abilityNumber}>{Math.abs(modifier)}</div>
				</div>
				<div className={css.abilityScore}>{character[ability]}</div>
			</div>
		);
	}

	handleClick(e, advantage: number): void {
		const modifier = Rules.getAbilityModifier(this.props.character, this.props.ability);
		const modifierStr = (modifier < 0 ? '' : '+') + modifier;
		const roll = new DiceRoll('d20' + modifierStr);
		const stat = Rules.getLongAbilityName(this.props.ability);

		const data: RollData = {
			type: 'roll',
			rollType: 'Ability',
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
