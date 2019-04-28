import React, { ReactNode } from 'react';

import styles from './Equipment.module.css';
import { Character } from '../../models/Character';
import EquipmentItem from './EquipmentItem';

interface Props {
	character: Character;
}

export default class Equipment extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	render(): ReactNode {
		const { character } = this.props;

		const equipment = character.equipment.map((item, idx) => (
			<EquipmentItem key={idx} item={item} {...this.props} />
		));

		return (
			<div className={styles.equipment}>
				<div className={styles.wrapper}>
					<div className={styles.header}>
						<span className={styles.name}>Name</span>
						<span className={styles.quantity}>Quantity</span>
						<span className={styles.weight}>Weight</span>
						<span className={styles.notes}>Notes</span>
					</div>
					{equipment}
				</div>
				<div className={styles.title}>Equipment</div>
			</div>
		);
	}
}
