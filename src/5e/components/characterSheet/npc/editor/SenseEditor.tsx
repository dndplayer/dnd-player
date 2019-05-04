import React, { ReactNode } from 'react';

import css from './NonPlayerCharacterSheetEditor.module.css';
import { NonPlayerCharacter } from '../../../../models/Character';

interface Props {
	type: string;
	character: NonPlayerCharacter;
	updateSenseProperty: (property: string, value: any) => void;
}

export default class SenseEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { type, character } = this.props;

		const value = (character.senses || {})[type] || 0;
		return (
			<div className={css.sense}>
				<div className={css.senseTitle}>{type} (ft.)</div>
				<input
					value={value}
					type="number"
					min={0}
					placeholder={'10'}
					onChange={e => this.props.updateSenseProperty(type, e.target.value)}
				/>
			</div>
		);
	}
}
