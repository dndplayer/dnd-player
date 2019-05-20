import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.scss';
import { PlayerCharacter } from '../../../../models/Character';

interface Props {
	slot: number;
	character: PlayerCharacter;
	updateCharacterProperty: (property: string, value: any) => void;
}

export default class SpellSlotEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { slot, character } = this.props;

		const characterSlot = (character.spellSlots || {})[slot] || { current: 0, max: 0 };
		return (
			<div className={css.spellSlot}>
				<div className={css.spellSlotTitle}>{slot}</div>
				<input
					value={characterSlot.current}
					type="number"
					min={0}
					onChange={e =>
						this.props.updateCharacterProperty('spellSlots', {
							...character.spellSlots,
							[slot]: {
								...(character.spellSlots[slot] || {}),
								current: parseInt(e.target.value) || 0
							}
						})
					}
				/>
				/
				<input
					value={characterSlot.max}
					type="number"
					min={0}
					onChange={e =>
						this.props.updateCharacterProperty('spellSlots', {
							...character.spellSlots,
							[slot]: {
								...(character.spellSlots[slot] || {}),
								max: parseInt(e.target.value) || 0
							}
						})
					}
				/>
			</div>
		);
	}
}
