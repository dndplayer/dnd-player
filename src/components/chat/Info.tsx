import React, { ReactNode } from 'react';
import { ChatMessage, InfoData } from '../../models/ChatMessage';
import ReactMarkdown from 'react-markdown';

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
					<div className={styles.infoTitle}>{data.title}</div>
					<span className={styles.infoUser}>{data.characterName || message.sender}</span>
				</div>
				<hr />
				<div className={styles.infoDetails}>
					<ReactMarkdown>{data.details}</ReactMarkdown>
				</div>
			</div>
		);
	}
}
