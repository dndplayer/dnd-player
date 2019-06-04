import React, { Component, ReactNode, ReactElement } from 'react';

import styles from './StateCounter.module.scss';
import StatePip from './StatePip';

interface Props {
	name: string;
	remainingCount: number;
	stateColour: string;
}

export default class StateCounter extends Component<Props> {
	render(): ReactNode {
		const { remainingCount, stateColour } = this.props;

		const unlimited = remainingCount === undefined || remainingCount === null;
		const pipCount = unlimited ? 1 : Math.min(3, remainingCount);

		return (
			<div className={styles.wrapper}>
				{[...Array(pipCount)].map(
					(_, i): ReactElement => (
						<StatePip key={i} colour={stateColour} />
					)
				)}
			</div>
		);
	}
}
