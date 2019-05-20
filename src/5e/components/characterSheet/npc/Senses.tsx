import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheet.module.scss';
import { NonPlayerCharacter } from '../../../models/Character';
import Rules from '../../../5eRules';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	character: NonPlayerCharacter;
}

export default class Senses extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character } = this.props;

		if (!character.senses) {
			return null;
		}

		const senses = [];
		for (const senseType in character.senses) {
			const range = character.senses[senseType];
			if (range) {
				senses.push(
					<div key={senseType}>
						{Rules.getSenseName(senseType)} {range.toString()} ft.
					</div>
				);
			}
		}

		return (
			<div className={css.row}>
				<span className={css.boldHeading}>Senses</span>
				{senses}
			</div>
		);
	}
}
