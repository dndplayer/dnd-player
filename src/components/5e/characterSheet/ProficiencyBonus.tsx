import React, { ReactNode, ReactElement } from 'react';

import './CharacterSheet.css';
import { Character } from '../Character';
import Rules from '../5eRules';

interface Props {
	character: Character;
}
interface State {}

export default class ProficiencyBonus extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	// private chatRoom: firebase.firestore.CollectionReference;

	// private cleanup: () => void;

	render(): ReactNode {
		const { character } = this.props;
		const modifier = Rules.getProficiencyBonus(character);

		return (
			<div className="proficiency">
				<div className="proficiency-title">Proficiency</div>
				<div className="proficiency-modifier">
					<div className="proficiency-symbol">+</div>
					<div className="proficiency-number">{modifier}</div>
				</div>
			</div>
		);
	}

	componentDidMount(): void {}
	componentWillUnmount(): void {}
}
