import React, { ReactNode } from 'react';

import styles from './EquipmentItem.module.css';
import { Character, CharacterEquipment } from '../../../models/Character';

interface Props {
	character: Character;
	item: CharacterEquipment;
}

export default class EquipmentItem extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	render(): ReactNode {
		const { character, item } = this.props;

		return (
			<div className={styles.wrapper}>
				<span className={styles.name}>{item.name}</span>
				<span className={styles.quantity}>{item.quantity || '-'}</span>
				<span className={styles.weight}>{item.weight ? item.weight + ' lb.' : '-'}</span>
				<span className={styles.notes}>{item.notes}</span>
			</div>
		);
	}
}
