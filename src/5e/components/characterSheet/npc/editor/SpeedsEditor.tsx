import React, { ReactNode } from 'react';

import css from './NonPlayerCharacterSheetEditor.module.css';
import { Character } from '../../../../models/Character';
import SpeedEditor from './SpeedEditor';

interface Props {
	character: Character;
	updateCharacterProperty: (property: string, value: any) => void;
}

export default class SpeedsEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const update = this.update.bind(this);
		const { character } = this.props;
		return (
			<div className={`${css.speedContainer} ${css.row}`}>
				<SpeedEditor type="walk" character={character} updateSpeedProperty={update} />
				<SpeedEditor type="fly" character={character} updateSpeedProperty={update} />
				<SpeedEditor type="climb" character={character} updateSpeedProperty={update} />
				<SpeedEditor type="swim" character={character} updateSpeedProperty={update} />
				<SpeedEditor type="burrow" character={character} updateSpeedProperty={update} />
			</div>
		);
	}

	update(type: string, value: number): void {
		const speed = { ...this.props.character.speed };
		speed[type] = value;
		this.props.updateCharacterProperty('speed', speed);
	}
}
