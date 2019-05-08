import React, { ReactNode } from 'react';

import { PlayerCharacter } from '../../../models/Character';

interface Props {
	character: PlayerCharacter;
	slot: number;
}

export default class SpellSlot extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character, slot } = this.props;

		const characterSlot = (character.spellSlots || {})[slot];
		if (!characterSlot || !characterSlot.max) {
			return null;
		}

		return (
			<div className="column">
				<div>{slot}</div>
				<div>
					{characterSlot.current} / {characterSlot.max}
				</div>
			</div>
		);
	}
}
