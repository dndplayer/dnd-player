import React, { Component, ReactNode, ReactElement } from 'react';
import StateCounter from './StateCounter';

// TODO: This should be replaced with an actual model used by
// the Char eventually.
interface StatusEffect {
	name: string;
	remainingCount: number;
	colour: string;
}

interface Props {
	states: StatusEffect[];
}

export default class StateTracker extends Component<Props> {
	render(): ReactNode {
		const { states } = this.props;

		return states.map(
			(x): ReactElement => (
				<StateCounter
					key={x.name}
					name={x.name}
					remainingCount={x.remainingCount}
					stateColour={x.colour}
				/>
			)
		);
	}
}
