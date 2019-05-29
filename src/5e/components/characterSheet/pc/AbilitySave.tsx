import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';

import css from './PlayerCharacterSheet.module.scss';
import { PlayerCharacter } from '../../../models/Character';
import Rules from '../../../5eRules';
import { ProficiencyClassMap } from './PlayerCharacterSheet';
import CharacterActionHelper from '../../../CharacterActionHelper';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	ability: string;
	character: PlayerCharacter;
}

export default class AbilitySave extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	render(): ReactNode {
		const { ability, character } = this.props;
		const saves = character.saves || {};
		const modifier = Rules.getSaveModifier(character, ability);
		const proficiencyClass = ProficiencyClassMap[saves[ability] || 0];

		return (
			<div className={css.save} onClick={(e): void => this.handleClick(e, 0)}>
				<div className={css.popupAdvantage} onClick={(e): void => this.handleClick(e, 1)}>
					A
				</div>
				<div
					className={css.popupDisadvantage}
					onClick={(e): void => this.handleClick(e, -1)}
				>
					D
				</div>
				<div className={css.saveWrapper}>
					<div className={`${css.saveProficiency} ${proficiencyClass}`} />
					<div className={css.saveTitle}>{Rules.getShortAbilityName(ability)}</div>
					<div className={css.saveModifier}>
						<span className={css.saveSymbol}>{modifier < 0 ? '-' : '+'}</span>
						<span className={css.saveNumber}>{Math.abs(modifier)}</span>
					</div>
				</div>
			</div>
		);
	}

	handleClick(e, advantage: number): void {
		e.stopPropagation();

		CharacterActionHelper.doBasicRoll(
			this.props.character,
			'Save',
			Rules.getSaveName(this.props.ability),
			Rules.getSaveModifier(this.props.character, this.props.ability),
			advantage,
			this.props.sendMessage
		);
	}
}
