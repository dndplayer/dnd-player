import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.css';
import { PlayerCharacter } from '../../../../models/Character';
import MoneyEditor from './MoneyEditor';

interface Props {
	character: PlayerCharacter;
	updateCharacterProperty: (property: string, value: any) => void;
}

export default class MoneyEditorContainer extends React.Component<Props, {}> {
	render(): ReactNode {
		return (
			<div className={css.abilityContainer}>
				<MoneyEditor type="cp" {...this.props} />
				<MoneyEditor type="sp" {...this.props} />
				<MoneyEditor type="gp" {...this.props} />
				<MoneyEditor type="ep" {...this.props} />
				<MoneyEditor type="pp" {...this.props} />
			</div>
		);
	}
}
