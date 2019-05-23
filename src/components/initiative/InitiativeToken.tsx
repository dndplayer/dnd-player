import React, { Component, ReactNode } from 'react';
import { Character, PlayerCharacter, NonPlayerCharacter } from '../../5e/models/Character';

import styles from './InitiativeToken.module.scss';
import { url } from 'inspector';
import { Zoom, Paper } from '@material-ui/core';
import InlineCalculator from '../util/InlineCalculator';
import { MapObject } from '../../models/Map';

interface Props {
	initId: string;
	initRoll: number;
	char: Character;
	isPc: boolean;
	isNpc: boolean;
	npcTokenId?: string;
	npcToken?: MapObject;
	currentTurn: boolean;
	imageUrl: string;
	modifyHp: (newHp: any, pcId?: string, npcTokenId?: string) => void;
	removeInitiative: (id: string) => void;
	dm: boolean;
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
		if (!this.props.dm) {
			return;
		}

		this.setState(state => ({
			hpOpen: !state.hpOpen
		}));
	};

	onChangeHp = val => {
		if (this.props.modifyHp) {
			this.props.modifyHp(
				{ ...this.props.npcToken.hp, hp: val },
				this.props.isPc ? this.props.char.id : null,
				this.props.isNpc ? this.props.npcTokenId : null
			);
		}
	};

	render(): ReactNode {
		const { char, initRoll, currentTurn, imageUrl, isPc, isNpc, npcToken } = this.props;
		const { hpOpen } = this.state;

		const pc = char as PlayerCharacter;
		const npc = char as NonPlayerCharacter;

		const ac = isPc && pc ? pc.ac : isNpc && npc ? npc.ac : 0;

		const hp =
			isPc && pc ? pc.hp : isNpc && npcToken && npcToken.hp ? npcToken.hp.value || 0 : 0;
		const hpMax =
			isPc && pc ? pc.maxHp : isNpc && npcToken && npcToken.hp ? npcToken.hp.max || 0 : 0;

		return (
			<div className={styles.wrapper}>
				<div className={styles.initiativeRoll}>{initRoll}</div>
				<div
					className={[styles.avatar, currentTurn ? styles.currentTurn : null]
						.filter(x => x)
						.join(' ')}
					style={{ backgroundImage: `url('${imageUrl}')` }}
					onClick={this.onClick}
				/>
				{this.props.dm && hpOpen && (
					<div
						className={styles.deleteButton}
						onClick={() => this.props.removeInitiative(this.props.initId)}
					>
						X
					</div>
				)}
				{(this.props.isPc || this.props.dm) && <div className={styles.ac}>{ac}</div>}
				{hpOpen && (
					<Zoom in={hpOpen}>
						<Paper elevation={4}>
							<InlineCalculator
								className={styles.hpInput}
								inputClassName={styles.hpInputInner}
								value={hp}
								onEnter={(val): void => this.onChangeHp(val)}
							/>
						</Paper>
					</Zoom>
				)}
			</div>
		);
	}
}
