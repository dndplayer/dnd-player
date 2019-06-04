import React, { Component, ReactNode } from 'react';

import styles from './StatePip.module.scss';

interface Props {
	colour?: string;
}

export default class StatePip extends Component<Props> {
	render(): ReactNode {
		const { colour } = this.props;

		return <div className={styles.pip} style={{ backgroundColor: colour || 'none' }} />;
	}
}
