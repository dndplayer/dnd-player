import React, { ReactNode } from 'react';

import './PlayerCharacterSheet.css';
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
			<div className="ac">
				<div className="ac-title">AC</div>
				<div className="ac-number">{character.ac}</div>
			</div>
		);
	}
}
