import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheet.module.scss';
import { NonPlayerCharacter } from '../../../models/Character';
import SavingThrow from './SavingThrow';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	character: NonPlayerCharacter;
}

export default class SavingThrows extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character } = this.props;

		if (!character.saves) {
			return null;
		}

		const saves = [];
		for (const saveType in character.saves) {
			if (!character.saves[saveType]) {
				continue;
			}

			saves.push(<SavingThrow key={saveType} save={saveType} {...this.props} />);
		}

		if (!saves.length) {
			return null;
		}

		return (
			<div className={css.row}>
				<span className={css.boldHeading}>Saving Throws</span>
				{saves}
			</div>
		);
	}
}
