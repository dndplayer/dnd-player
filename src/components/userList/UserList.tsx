import React, { Component, ReactNode } from 'react';
import { User } from '../../models/User';

import styles from './UserList.module.scss';

interface Props {
	users: User[];
	onlineUsers: string[];
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
				<div className={styles.header}>User List</div>
				<ul className={styles.listStyle}>
					{this.props.users.map(x => (
						// Change this to use id as key
						<li
							key={x.id}
							className={[
								styles.user,
								this.props.onlineUsers.findIndex(y => y === x.id) >= 0
									? styles.online
									: null
							].join(' ')}
							style={{
								color: x.colour ? `#${x.colour.toString(16)}` : '#fff',
								textShadow: `${
									x.colour ? `#${x.colour.toString(16)}` : '#fff'
								} 0px 0px 3px`
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
