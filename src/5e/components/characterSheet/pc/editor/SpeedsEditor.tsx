import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.scss';
import { PlayerCharacter } from '../../../../models/Character';

interface Props {
	character: PlayerCharacter;
	updateCharacterProperty: (property: string, value: any) => void;
}

export default class SpeedsEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const update = this.update.bind(this);
		const { character } = this.props;
		return (
			<div className={css.columnCenter}>
				<span className={css.label}>Speed</span>
				<div className={`${css.speedContainer} ${css.row}`}>
					<SpeedEditor type="walk" character={character} updateSpeedProperty={update} />
					<SpeedEditor type="fly" character={character} updateSpeedProperty={update} />
					<SpeedEditor type="climb" character={character} updateSpeedProperty={update} />
					<SpeedEditor type="swim" character={character} updateSpeedProperty={update} />
					<SpeedEditor type="burrow" character={character} updateSpeedProperty={update} />
				</div>
			</div>
		);
	}

	update(type: string, value: number): void {
		const speed = { ...this.props.character.speed };
		speed[type] = value;
		this.props.updateCharacterProperty('speed', speed);
	}
}

interface InnerProps {
	type: string;
	character: PlayerCharacter;
	updateSpeedProperty: (property: string, value: any) => void;
}

class SpeedEditor extends React.Component<InnerProps, {}> {
	render(): ReactNode {
		const { type, character } = this.props;

		const value = (character.speed || {})[type] || 0;
		return (
			<div className={css.speed}>
				<div className={css.label}>{type} (ft.)</div>
				<input
					value={value}
					type="number"
					min={0}
					placeholder={'10'}
					onChange={(e): void => this.props.updateSpeedProperty(type, e.target.value)}
				/>
			</div>
		);
	}
}
