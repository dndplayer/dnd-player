import React, { ReactNode } from 'react';
import { ChatMessage, InfoData } from '../../models/ChatMessage';

import styles from './Info.module.scss';

interface Props {
	message: ChatMessage;
}
export default class Info extends React.Component<Props> {
	render(): ReactNode {
		const { message } = this.props;
		const data = message.data as InfoData;

		return (
			<div className={styles.info} key={message.id}>
				<div className={styles.infoHeader}>
					<span className={styles.infoUser}>{data.characterName || message.sender}</span>
					<span className={styles.infoType}>Info</span>
				</div>
				<div className={styles.infoTitle}>
					<span>{data.title}</span>
				</div>
				<span className={styles.infoDetails}>{data.details}</span>
			</div>
		);
	}
}
