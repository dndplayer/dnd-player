import React, { Component, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './OverlayPanel.module.css';

export default class OverlayPanel extends Component {
	state = {
		in: false
	};

	componentDidMount() {
		setTimeout(() => this.setState({ in: true }), 0);
	}

	render(): ReactNode {
		return (
			<div
				style={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					padding: '5px',
					overflowY: 'scroll'
				}}
			>
				<CSSTransition
					in={this.state.in}
					timeout={500}
					classNames={{
						enter: styles.enter,
						enterActive: styles.enterActive,
						exit: styles.exit,
						exitActive: styles.exitActive
					}}
				>
					<div>{this.props.children}</div>
				</CSSTransition>
			</div>
		);
	}
}
