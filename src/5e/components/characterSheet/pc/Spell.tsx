import React, { ReactNode } from 'react';

import styles from './Spells.module.scss';
import { Character, CharacterSpell } from '../../../models/Character';
import Rollable from '../../Rollable';
import CharacterActionHelper from '../../../CharacterActionHelper';
import { ChatMessageData } from '../../../../models/ChatMessage';
import HoverPopup from '../../../../components/util/HoverPopup';

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
				<Rollable onClick={onClick}>
					<HoverPopup content={(spell.effects[0] as any).text}>{spell.name}</HoverPopup>
				</Rollable>
				<span className={styles.level}>{spell.level}</span>
				{spell.concentration && <span>Concentration</span>}
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
