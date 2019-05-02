import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheet.module.css';
import { NonPlayerCharacter } from '../../../models/Character';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	character: NonPlayerCharacter;
}

export default class Features extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character } = this.props;

		if (!character.features || !character.features.length) {
			return null;
		}

		const features = [];
		for (const featureIdx in character.features) {
			const feature = character.features[featureIdx];
			features.push(
				<div className={css.feature} key={featureIdx}>
					<span className={css.italicHeading}>{feature.title}.</span>
					<span>{feature.description}</span>
				</div>
			);
		}

		return <div>{features}</div>;
	}
}