import React, { ReactNode } from 'react';

import { PlayerCharacter } from '../../../models/Character';
import InlineCalculator from '../../../../components/util/InlineCalculator';
import css from './PlayerCharacterSheet.module.scss';

interface Props {
	character: PlayerCharacter;
	slot: number;
	updatePlayerCharacter: (characterId: string, character: PlayerCharacter) => void;
}

export default class SpellSlot extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character, slot } = this.props;

		const characterSlot = (character.spellSlots || {})[slot];
		if (!characterSlot || !characterSlot.max) {
			return null;
		}

		return (
			<div className={css.row}>
				<div>{slot}:</div>
				<div className={css.row}>
					<InlineCalculator
						value={characterSlot.current}
						onEnter={val => {
							const slots = { ...character.spellSlots };
							slots[this.props.slot] = {
								current: val,
								max: characterSlot.max
							};
							this.props.updatePlayerCharacter(character.id, {
								...character,
								spellSlots: slots
							});
						}}
					/>
					<div>/ {characterSlot.max}</div>
				</div>
			</div>
		);
	}
}
