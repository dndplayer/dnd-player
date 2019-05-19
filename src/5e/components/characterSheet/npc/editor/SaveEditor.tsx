import React, { ReactNode } from 'react';

import css from './NonPlayerCharacterSheetEditor.module.css';
import { NonPlayerCharacter } from '../../../../models/Character';
import Rules from '../../../../5eRules';

interface Props {
	type: string;
	character: NonPlayerCharacter;
	updateSaveProperty: (property: string, value: any) => void;
}

export default class SaveEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { type, character } = this.props;

		const value = (character.saves || {})[type] || 0;
		return (
			<div className={css.save}>
				<div className={css.saveTitle}>{Rules.getShortAbilityName(type)}</div>
				<input
					value={value}
					type="number"
					min={0}
					placeholder={'10'}
					onChange={(e): void => this.props.updateSaveProperty(type, e.target.value)}
				/>
			</div>
		);
	}
}
