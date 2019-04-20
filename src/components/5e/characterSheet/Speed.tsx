import React, { ReactNode, ReactElement } from 'react';

import './CharacterSheet.css';
import { Character } from '../Character';

interface Props {
	character: Character;
}
interface State {}

export default class Speed extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	// private chatRoom: firebase.firestore.CollectionReference;

	// private cleanup: () => void;

	render(): ReactNode {
		const { character } = this.props;

		const movementTypes = [];
		for (const movementType of Object.keys(character.speed)) {
			movementTypes.push(
				<div className="speed-container" key={movementType}>
					<div className="speed-popup-wrap">
						<span className="speed-number">{character.speed[movementType]}</span>
						<span className="speed-unit">ft.</span>
					</div>
					<div className="speed-type">{movementType}</div>
				</div>
			);
		}

		return (
			<div className="speed">
				<div className="speed-title">Speed</div>
				<div className="speed-container">
					<span className="speed-number">{character.speed.walk}</span>
					<span className="speed-unit">ft.</span>
				</div>
				<div className="speed-popup">
					<div className="speed-title">Speed</div>
					{movementTypes}
				</div>
			</div>
		);
	}

	componentDidMount(): void {}
	componentWillUnmount(): void {}
}
