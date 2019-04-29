import React, { ReactNode } from 'react';

import './CharacterSheet.css';
import { Character, CharacterSpeeds } from '../../models/Character';

interface Props {
	character: Character;
}

export default class Speed extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	render(): ReactNode {
		const { character } = this.props;
		const speed: CharacterSpeeds = character.speed || { walk: 0 };

		const movementTypes = [];
		for (const movementType of Object.keys(speed)) {
			movementTypes.push(
				<div className="speed-container" key={movementType}>
					<div className="speed-popup-wrap">
						<span className="speed-number">{speed[movementType]}</span>
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
					<span className="speed-number">{speed.walk}</span>
					<span className="speed-unit">ft.</span>
				</div>
				<div className="speed-popup">
					<div className="speed-title">Speed</div>
					{movementTypes}
				</div>
			</div>
		);
	}
}
