import React, { ReactNode } from 'react';

import styles from './EquipmentItem.module.scss';
import { Character, CharacterSpell } from '../../../models/Character';
import Rollable from '../../Rollable';
import CharacterActionHelper from '../../../CharacterActionHelper';
import { ChatMessageData } from '../../../../models/ChatMessage';

interface Props {
	character: Character;
	spell: CharacterSpell;
	prepared: boolean;
	sendMessage: (message: string, data?: ChatMessageData) => void;
}

export default class Spell extends React.Component<Props, {}> {
	render(): ReactNode {
		const { spell } = this.props;

		const onClick = this.onClick.bind(this);
		return (
			<div className={styles.wrapper}>
				<input type="checkbox" checked={this.props.prepared} disabled />
				<Rollable showAdvantage onClick={onClick}>
					{spell.name}
				</Rollable>
				<span className={styles.school}>{spell.school}</span>
				<span className={styles.level}>{spell.level}</span>
			</div>
		);
	}

	onClick(advantage: number): void {
		CharacterActionHelper.doSpell(
			this.props.character,
			this.props.spell,
			advantage,
			this.props.sendMessage
		);
	}
}
