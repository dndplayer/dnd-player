import React, { Component, ReactNode, ReactElement } from 'react';

import styles from './InitiativeTracker.module.scss';
import InitiativeToken from './InitiativeToken';
import { InitiativeRoller } from '../../models/Initiative';
import { Fab } from '@material-ui/core';
import SkipNextIcon from '@material-ui/icons/SkipNext';

interface Props {
	initiatives: InitiativeRoller[];
}

export default class InitiativeTracker extends Component<Props> {
	render(): ReactNode {
		return (
			<div className={styles.trackerWrapper}>
				<div className={styles.tokenWrapper}>
					{this.props.initiatives.map(
						(x): ReactElement => (
							<InitiativeToken
								key={x.character.id}
								char={x.character}
								initRoll={x.initiativeRoll}
								currentTurn={x.currentTurn}
							/>
						)
					)}
				</div>
				<div className={styles.backLine} />
				<Fab
					color="secondary"
					size="small"
					aria-label="Next Turn"
					className={styles.nextButton}
				>
					<SkipNextIcon />
				</Fab>
			</div>
		);
	}
}
