import React, { ReactNode } from 'react';

import styles from './PlayerCharacterSheet.module.scss';
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
			<div key={idx} className={styles.trait}>
				<span className={styles.title}>{item.name}.</span>
				<span>{item.description}</span>
			</div>
		));

		return (
			<div className={styles.traits}>
				<div className={styles.subtitle}>Traits</div>
				<div className={styles.wrapper}>{traits}</div>
			</div>
		);
	}
}
