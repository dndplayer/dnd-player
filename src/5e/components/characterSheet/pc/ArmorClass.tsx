import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheet.module.scss';
import { PlayerCharacter } from '../../../models/Character';

interface Props {
	character: PlayerCharacter;
}

export default class ArmorClass extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	render(): ReactNode {
		const { character } = this.props;

		return (
			<div className={css.ac}>
				<div className={css.acTitle}>AC</div>
				<div className={css.acNumber}>{character.ac}</div>
			</div>
		);
	}
}
