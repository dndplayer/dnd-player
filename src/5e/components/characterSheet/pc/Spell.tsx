import React, { ReactNode } from 'react';

import styles from './EquipmentItem.module.css';
import { Character, CharacterSpell } from '../../../models/Character';

interface Props {
	character: Character;
	spell: CharacterSpell;
}

export default class EquipmentItem extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character, spell } = this.props;

		return (
			<div className={styles.wrapper}>
				<span className={styles.name}>{spell.name}</span>
				<span className={styles.school}>{spell.school}</span>
				<span className={styles.level}>{spell.level}</span>
			</div>
		);
	}
}
