import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.scss';
import { PlayerCharacter } from '../../../../models/Character';
import AbilityScoreEditor from './AbilityScoreEditor';

interface Props {
	character: PlayerCharacter;
	updateCharacterProperty: (property: string, value: any) => void;
}

export default class AbilityScoreEditorContainer extends React.Component<Props, {}> {
	render(): ReactNode {
		return (
			<div className={css.row}>
				<AbilityScoreEditor ability="strength" {...this.props} />
				<AbilityScoreEditor ability="dexterity" {...this.props} />
				<AbilityScoreEditor ability="constitution" {...this.props} />
				<AbilityScoreEditor ability="intelligence" {...this.props} />
				<AbilityScoreEditor ability="wisdom" {...this.props} />
				<AbilityScoreEditor ability="charisma" {...this.props} />
			</div>
		);
	}
}
