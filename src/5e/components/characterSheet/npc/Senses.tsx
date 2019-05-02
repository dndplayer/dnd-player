import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheet.module.css';
import { NonPlayerCharacter } from '../../../models/Character';
import Rules from '../../../5eRules';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	character: NonPlayerCharacter;
}

export default class Senses extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character } = this.props;

		if (!character.senses || !character.senses.length) {
			return null;
		}

		const senses = [];
		for (const senseIdx in character.senses) {
			const sense = character.senses[senseIdx];
			senses.push(
				<div key={senseIdx}>
					{Rules.getSenseName(sense.type)} {sense.range} ft.
				</div>
			);
		}

		return (
			<div className="row">
				<span className={css.boldHeading}>Senses</span>
				{senses}
			</div>
		);
	}
}
