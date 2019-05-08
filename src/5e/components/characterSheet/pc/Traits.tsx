import React, { ReactNode } from 'react';

import styles from './Equipment.module.css';
import { PlayerCharacter } from '../../../models/Character';

interface Props {
	character: PlayerCharacter;
}

export default class Traits extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	render(): ReactNode {
		const { character } = this.props;

		const traits = (character.traits || []).map((item, idx) => (
			<div key={idx}>
				<div>{item.name}</div>
				<div>{item.description}</div>
			</div>
		));

		return (
			<div className={styles.traits}>
				<div className={styles.wrapper}>{traits}</div>
				<div className={styles.title}>Traits</div>
			</div>
		);
	}
}
