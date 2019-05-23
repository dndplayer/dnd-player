import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheet.module.scss';
import { Character, CharacterSpeeds } from '../../../models/Character';

interface Props {
	character: Character;
}

export default class Speed extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character } = this.props;
		const speed: CharacterSpeeds = character.speed || { walk: 0 };

		const movementTypes = [];
		for (const movementType of Object.keys(speed)) {
			if (!speed[movementType]) {
				continue;
			}
			movementTypes.push(
				<div className={css.speedContainer} key={movementType}>
					<div className={css.speedPopupWrap}>
						<span className={css.speedNumber}>{speed[movementType]}</span>
						<span className={css.speedUnit}>ft.</span>
					</div>
					<div className={css.speedType}>{movementType}</div>
				</div>
			);
		}

		return (
			<div className={css.speed}>
				<div className={css.speedTitle}>Speed</div>
				<div className={css.speedContainer}>
					<span className={css.speedNumber}>{speed.walk}</span>
					<span className={css.speedUnit}>ft.</span>
				</div>
				<div className={css.speedPopup}>
					<div className={css.speedTitle}>Speed</div>
					{movementTypes}
				</div>
			</div>
		);
	}
}
