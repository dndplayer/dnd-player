import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.css';
import { PlayerCharacter } from '../../../../models/Character';
import Rules from '../../../../5eRules';

interface Props {
	type: string;
	character: PlayerCharacter;
	updateCharacterProperty: (property: string, value: any) => void;
}

export default class MoneyEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { type, character } = this.props;

		return (
			<div className={css.money}>
				<div className={css.moneyTitle}>{type}</div>
				<input
					value={(character.money || {})[type]}
					type="number"
					min={0}
					placeholder={'10'}
					onChange={e =>
						this.props.updateCharacterProperty('money', {
							...character.money,
							[type]: e.target.value
						})
					}
				/>
			</div>
		);
	}
}
