import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.scss';
import { PlayerCharacter } from '../../../../models/Character';
import Rules from '../../../../5eRules';

interface Props {
	slot: number;
	character: PlayerCharacter;
	updateCharacterProperty: (property: string, value: any) => void;
}

export default class SpellSlotEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { slot, character } = this.props;

		const characterSlot = (character.spellSlots || {})[slot] || { current: 0, max: 0 };
		const calculatedSlots = Rules.getSpellSlots(character);
		if (!calculatedSlots[slot]) {
			return null;
		}

		return (
			<div className={css.spellSlot}>
				<div className={css.spellSlotTitle}>{slot}</div>
				<input
					value={characterSlot.current}
					type="number"
					min={0}
					max={calculatedSlots[slot]}
					onChange={e =>
						this.props.updateCharacterProperty('spellSlots', {
							...character.spellSlots,
							[slot]: {
								...characterSlot,
								current: parseInt(e.target.value) || 0
							}
						})
					}
				/>
				/ {calculatedSlots[slot]}
			</div>
		);
	}
}
