import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheet.module.scss';
import { NonPlayerCharacter } from '../../../models/Character';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	character: NonPlayerCharacter;
}

export default class Traits extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character } = this.props;

		if (!character.traits || !character.traits.length) {
			return null;
		}

		const traits = [];
		for (const traitIdx in character.traits) {
			const trait = character.traits[traitIdx];
			traits.push(
				<div className={css.trait} key={traitIdx}>
					<span className={css.italicHeading}>{trait.title}.</span>
					<span>{trait.description}</span>
				</div>
			);
		}

		return <div>{traits}</div>;
	}
}
