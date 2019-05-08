import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.css';
import { PlayerCharacter } from '../../../../models/Character';
import SpellSlotEditor from './SpellSlotEditor';

interface Props {
	character: PlayerCharacter;
	updateCharacterProperty: (property: string, value: any) => void;
}

export default class SpellSlotEditorContainer extends React.Component<Props, {}> {
	render(): ReactNode {
		return (
			<div className={css.abilityContainer}>
				Spell slots:
				<SpellSlotEditor slot={1} {...this.props} />
				<SpellSlotEditor slot={2} {...this.props} />
				<SpellSlotEditor slot={3} {...this.props} />
				<SpellSlotEditor slot={4} {...this.props} />
				<SpellSlotEditor slot={5} {...this.props} />
				<SpellSlotEditor slot={6} {...this.props} />
				<SpellSlotEditor slot={7} {...this.props} />
				<SpellSlotEditor slot={8} {...this.props} />
				<SpellSlotEditor slot={9} {...this.props} />
			</div>
		);
	}
}
