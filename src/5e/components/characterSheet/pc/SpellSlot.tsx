import React, { ReactNode } from 'react';

import { PlayerCharacter } from '../../../models/Character';
import css from './PlayerCharacterSheet.module.scss';
import Rules from '../../../5eRules';

interface Props {
	character: PlayerCharacter;
	slot: number;
	updatePlayerCharacter: (characterId: string, character: PlayerCharacter) => void;
}

export default class SpellSlot extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character, slot } = this.props;

		const calculatedSlots = Rules.getSpellSlots(character);
		if ((slot === 0 && !this.props.children) || (slot !== 0 && !calculatedSlots[slot])) {
			return null;
		}

		const decrement = this.adjustSlot.bind(this, -1);
		const increment = this.adjustSlot.bind(this, 1);

		const characterSlot = (character.spellSlots || {})[slot];

		const slots = [];
		for (let i = 0; i < calculatedSlots[slot]; i++) {
			if (i < characterSlot.current) {
				slots.push(<div key={i} className={css.fullSpellSlot} onClick={decrement} />);
			} else {
				slots.push(<div key={i} className={css.emptySpellSlot} onClick={increment} />);
			}
		}

		return (
			<div>
				<div className={css.rowCenter} style={{ justifyContent: 'space-between' }}>
					<div className={css.slotTitle}>
						{slot === 0 ? (
							'Cantrips'
						) : (
							<span>
								Level <span className={css.slotNumber}>{slot}</span>
							</span>
						)}
					</div>
					<div>{slots}</div>
				</div>
				<div>{this.props.children}</div>
			</div>
		);
	}

	adjustSlot(adjustment: number): void {
		const slots = { ...this.props.character.spellSlots };
		slots[this.props.slot] = {
			current: slots[this.props.slot].current + adjustment
		};
		this.props.updatePlayerCharacter(this.props.character.id, {
			...this.props.character,
			spellSlots: slots
		});
	}
}
