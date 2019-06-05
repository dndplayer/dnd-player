import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheet.module.scss';
import { NonPlayerCharacter } from '../../../models/Character';
import Rules from '../../../5eRules';
import Rollable from '../../Rollable';
import CharacterActionHelper from '../../../CharacterActionHelper';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	save: string;
	character: NonPlayerCharacter;
}

export default class SavingThrow extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	render(): ReactNode {
		const { save, character } = this.props;
		const modifier = character.saves[save];
		const saveName = Rules.getLongAbilityName(save);

		return (
			<div className={css.save}>
				<span style={{ marginRight: '4px' }}>{saveName}</span>
				<Rollable showAdvantage onClick={this.handleClick}>
					{modifier >= 0 ? `+${modifier}` : modifier}
				</Rollable>
			</div>
		);
	}

	handleClick(advantage: number): void {
		CharacterActionHelper.doBasicRoll(
			this.props.character,
			'Saving Throw',
			Rules.getSaveName(this.props.save),
			this.props.character.saves[this.props.save],
			advantage,
			this.props.sendMessage
		);
	}
}
