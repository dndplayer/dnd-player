import React, { Component, ReactNode } from 'react';

import styles from './InitiativeToken.module.scss';
import { Zoom, Paper } from '@material-ui/core';
import InlineCalculator from '../util/InlineCalculator';

interface Props {
	roll: number;
	onModifyRoll: (val: number) => void;
	dm?: boolean;
}

interface State {
	editing: boolean;
}

export default class InitiativeDice extends Component<Props, State> {
	state = {
		editing: false
	};

	private onClick = e => {
		if (!this.props.dm) {
			return;
		}
		this.setState(state => ({
			editing: !state.editing
		}));
	};

	private onModifyRoll = (val: number): void => {
		if (this.props.onModifyRoll) {
			this.props.onModifyRoll(val);
		}
	};

	render(): ReactNode {
		const { roll } = this.props;
		const { editing } = this.state;

		return (
			<div className={styles.initiativeRoll} onClick={this.onClick}>
				<div>
					{/* </div><div className={styles.initiativeRoll} onClick={this.onClick}> */}
					{roll}
				</div>
				{editing && (
					<Zoom in={editing}>
						<Paper elevation={4}>
							<InlineCalculator
								className={styles.initiativeEditor}
								inputClassName={styles.initiativeEditorInner}
								value={roll}
								onEnter={this.onModifyRoll}
								onBlur={() => this.setState({ editing: false })}
								autoFocus={true}
							/>
						</Paper>
					</Zoom>
				)}
			</div>
		);
	}
}
