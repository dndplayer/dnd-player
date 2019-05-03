import React, { ReactNode } from 'react';

import css from './NonPlayerCharacterSheetEditor.module.css';
import { Character } from '../../../../models/Character';

interface Props {
	type: string;
	character: Character;
	updateSpeedProperty: (property: string, value: any) => void;
}

export default class SpeedEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { type, character } = this.props;

		const value = (character.speed || {})[type] || 0;
		return (
			<div className={css.speed}>
				<div className={css.speedTitle}>{type} (ft.)</div>
				<input
					value={value}
					type="number"
					min={0}
					placeholder={'10'}
					onChange={e => this.props.updateSpeedProperty(type, e.target.value)}
				/>
			</div>
		);
	}
}
