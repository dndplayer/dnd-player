import React, { Component, ReactNode } from 'react';
import { Character, PlayerCharacter, NonPlayerCharacter } from '../../5e/models/Character';

import styles from './InitiativeToken.module.scss';
import { url } from 'inspector';
import { Zoom, Paper } from '@material-ui/core';
import InlineCalculator from '../util/InlineCalculator';

interface Props {
	initRoll: number;
	char: Character;
	isPc: boolean;
	isNpc: boolean;
	currentTurn: boolean;
	imageUrl: string;
	modifyHp: (pcId: string | null, npcId: string | null, newHp: number) => void;
}

interface State {
	hpOpen: boolean;
}

/**
 * A token representing a PC or NPC character on the initiative tracker.
 */
export default class InitiativeToken extends Component<Props, State> {
	state = {
		hpOpen: false
	};

	onClick = e => {
		this.setState(state => ({
			hpOpen: !state.hpOpen
		}));
	};

	onChangeHp = e => {
		if (this.props.modifyHp) {
			this.props.modifyHp(
				this.props.isPc ? this.props.char.id : null,
				this.props.isNpc ? this.props.char.id : null,
				e.target.value
			);
		}
	};

	render(): ReactNode {
		const { char, initRoll, currentTurn, imageUrl } = this.props;
		const { hpOpen } = this.state;

		const pc = char as PlayerCharacter;
		const npc = char as NonPlayerCharacter;

		return (
			<div className={styles.wrapper}>
				<div className={styles.initiativeRoll}>{initRoll}</div>
				<div
					className={[styles.avatar, currentTurn ? styles.currentTurn : null]
						.filter(x => x)
						.join(' ')}
					style={{ backgroundImage: `url(${imageUrl})` }}
					onClick={this.onClick}
				/>
				{/* <span className={styles.name}>{char.name}</span> */}
				{hpOpen && (
					<Zoom in={hpOpen}>
						<Paper elevation={4}>
							{/* <input
								className={styles.hpInput}
								value={pc ? pc.hp : npc ? npc.hp : 0}
								onChange={this.onChangeHp}
							/> */}
							<InlineCalculator
								className={styles.hpInput}
								inputClassName={styles.hpInputInner}
								value={pc ? pc.hp : npc ? npc.hp : 0}
								onEnter={(val): void => console.log(val)}
							/>
						</Paper>
					</Zoom>
				)}
			</div>
		);
	}
}
