import React, { ReactNode } from 'react';

import css from './Attacks.module.scss';
import { PlayerCharacter } from '../../../models/Character';
import Rules from '../../../5eRules';
import AttackBlock from './AttackBlock';
import { ChatMessageData } from '../../../../models/ChatMessage';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	character: PlayerCharacter;
}

export default class Attacks extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character } = this.props;

		const attacks = Rules.getAttacks(character).map(attack => (
			<AttackBlock key={attack.name} attack={attack} {...this.props} />
		));

		return (
			<div className={css.attack}>
				<div className={css.attackContainer}>
					<div className={css.attackHeader}>
						<span className={css.attackName}>Attack</span>
						<span className={css.attackRange}>Range</span>
						<span className={css.attackToHit}>To Hit</span>
						<span className={css.attackDamage}>Damage</span>
					</div>
					{attacks}
				</div>
				<div className={css.attacksTitle}>Attacks</div>
			</div>
		);
	}
}
