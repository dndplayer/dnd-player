import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheet.module.scss';
import { PlayerCharacter } from '../../../models/Character';
import InlineCalculator from '../../../../components/util/InlineCalculator';

interface Props {
	character: PlayerCharacter;
	updatePlayerCharacter: (characterId: string, character: PlayerCharacter) => void;
}

export default class HitPoints extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character } = this.props;

		return (
			<div className={css.hp}>
				<div className={css.hpTitle}>Hit Points</div>
				<div className={css.hpCurrent}>
					<InlineCalculator
						value={character.hp}
						inputClassName={css.hpCurrent}
						onEnter={(val): void =>
							this.props.updatePlayerCharacter(character.id, {
								...character,
								hp: val
							})
						}
					/>
					<span className={css.hpHeader}>Current</span>
				</div>
				<div className={css.hpDivider}>/</div>
				<div className={css.hpMax}>
					<span>{character.maxHp}</span>
					<span className={css.hpHeader}>Max</span>
				</div>
			</div>
		);
	}
}
