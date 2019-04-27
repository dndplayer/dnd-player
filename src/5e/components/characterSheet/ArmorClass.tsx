import React, { ReactNode } from 'react';

import './CharacterSheet.css';
import { Character } from '../../models/Character';

interface Props {
	character: Character;
}

export default class ArmorClass extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	// private chatRoom: firebase.firestore.CollectionReference;

	// private cleanup: () => void;

	render(): ReactNode {
		const { character } = this.props;

		return (
			<div className="ac">
				<div className="ac-title">AC</div>
				<div className="ac-number">{character.ac}</div>
			</div>
		);
	}

	componentDidMount(): void {}
	componentWillUnmount(): void {}
}
