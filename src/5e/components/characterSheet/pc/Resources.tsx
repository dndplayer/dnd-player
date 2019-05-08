import React, { ReactNode } from 'react';

import styles from './Equipment.module.css';
import { PlayerCharacter } from '../../../models/Character';

interface Props {
	character: PlayerCharacter;
}

export default class Resources extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character } = this.props;

		const resources = (character.resources || []).map((item, idx) => (
			<div key={idx}>
				<div>{item.name}</div>
				<div>
					{item.quantity} / {item.max}
				</div>
			</div>
		));

		return (
			<div className={styles.resources}>
				<div className={styles.wrapper}>{resources}</div>
				<div className={styles.title}>Resources</div>
			</div>
		);
	}
}
