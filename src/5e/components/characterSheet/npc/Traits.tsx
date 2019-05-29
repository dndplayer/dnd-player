import React, { ReactNode } from 'react';

import { ChatMessageData, InfoData } from '../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheet.module.scss';
import { NonPlayerCharacter, NonPlayerCharacterTrait } from '../../../models/Character';
import Rollable from '../../Rollable';

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
					<Rollable onClick={(): void => this.onClick(trait)}>
						<span className={css.italicHeading}>{trait.title}.</span>
					</Rollable>
					<span>{trait.description}</span>
				</div>
			);
		}

		return <div>{traits}</div>;
	}

	onClick(trait: NonPlayerCharacterTrait): void {
		const data: InfoData = {
			type: 'info',
			characterName: this.props.character.name,
			title: `Trait: ${trait.title}`,
			details: trait.description
		};

		this.props.sendMessage('', data);
	}
}
