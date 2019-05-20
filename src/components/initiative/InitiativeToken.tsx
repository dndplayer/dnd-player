import React, { Component, ReactNode } from 'react';
import { Character } from '../../5e/models/Character';

import styles from './InitiativeToken.module.scss';
import { url } from 'inspector';

interface Props {
	initRoll: number;
	char: Character;
	currentTurn: boolean;
}

/**
 * A token representing a PC or NPC character on the initiative tracker.
 */
export default class InitiativeToken extends Component<Props> {
	render(): ReactNode {
		const { char, initRoll, currentTurn } = this.props;

		return (
			<div className={styles.wrapper}>
				<div className={styles.initiativeRoll}>{initRoll}</div>
				<div
					className={[styles.avatar, currentTurn ? styles.currentTurn : null]
						.filter(x => x)
						.join(' ')}
					style={{ backgroundImage: `url(${char.imageRef})` }}
				/>
				{/* <span className={styles.name}>{char.name}</span> */}
			</div>
		);
	}
}
