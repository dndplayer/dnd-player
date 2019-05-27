import React, { Component, ReactNode } from 'react';
import { Character, PlayerCharacter, NonPlayerCharacter } from '../../5e/models/Character';

import styles from './InitiativeToken.module.scss';
import { url } from 'inspector';
import { Zoom, Paper } from '@material-ui/core';
import InlineCalculator from '../util/InlineCalculator';
import { MapObject } from '../../models/Map';
import InitiativeDice from './InitiativeDice';

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
	modifyRoll: (initiativeId: string, val: number) => void;
	removeInitiative: (id: string) => void;
	dm: boolean;
	shiftPressed: boolean;
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

		if (this.props.shiftPressed) {
			this.props.removeInitiative(this.props.initId);
			return;
		}

		this.setState(state => ({
			hpOpen: !state.hpOpen
		}));
	};

	onModifyRoll = (val: number): void => {
		if (this.props.modifyRoll) {
			this.props.modifyRoll(this.props.initId, val);
		}
	};

	onChangeHp = (val: number): void => {
		if (this.props.modifyHp) {
			const pc = this.props.char as PlayerCharacter;
			const npc = this.props.char as NonPlayerCharacter;

			const newHpData = this.props.isPc
				? { ...(pc || {}), hp: val }
				: this.props.isNpc
				? { ...this.props.npcToken.hp, hp: val }
				: null;

			this.props.modifyHp(
				newHpData,
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
				<InitiativeDice
					dm={this.props.dm}
					roll={initRoll}
					onModifyRoll={this.onModifyRoll}
				/>
				<div
					className={[styles.avatar, currentTurn ? styles.currentTurn : null]
						.filter(x => x)
						.join(' ')}
					style={{ backgroundImage: `url('${imageUrl}')` }}
					onClick={this.onClick}
				/>
				{(this.props.isPc || this.props.dm) && <div className={styles.ac}>{ac}</div>}
				{hpOpen && (
					<Zoom in={hpOpen}>
						<Paper elevation={4}>
							<InlineCalculator
								className={styles.hpInput}
								inputClassName={styles.hpInputInner}
								value={hp}
								onEnter={(val): void => this.onChangeHp(val)}
								onBlur={() => this.setState({ hpOpen: false })}
								autoFocus={true}
							/>
						</Paper>
					</Zoom>
				)}
			</div>
		);
	}
}
