import React, { Component, ReactNode } from 'react';
import { User } from '../../models/User';

import styles from './UserList.module.scss';

interface Props {
	users: User[];
	open: boolean;
}

export default class Userlist extends Component<Props> {
	render(): ReactNode {
		return (
			<div
				className={[
					styles.userListWrapper,
					!this.props.open ? styles.hidden : styles.visible
				].join(' ')}
			>
				<ul className={styles.listStyle}>
					{this.props.users.map(x => (
						// Change this to use id as key
						<li
							key={x.name}
							className={styles.user}
							style={{
								color: x.colour ? `#${x.colour.toString(16)}` : '#fff'
							}}
						>
							{x.name}
						</li>
					))}
				</ul>
			</div>
		);
	}
}
