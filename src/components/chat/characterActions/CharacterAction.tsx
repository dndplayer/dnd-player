import React, { ReactNode } from 'react';
import { ChatMessage, CharacterActionData } from '../../../models/ChatMessage';
import Result from './Result';
import css from './CharacterAction.module.scss';

interface Props {
	message: ChatMessage;
}

export default class CharacterAction extends React.Component<Props> {
	render(): ReactNode {
		const { message } = this.props;
		const data = message.data as CharacterActionData;

		const results = [];
		for (const idx in data.results) {
			const result = data.results[idx];
			results.push(<Result key={idx} action={result} />);
		}

		return (
			<div className={css.characterActionContainer}>
				<div className={css.actionHeader}>
					<span className={css.actionUser}>{data.characterName || message.sender}</span>
				</div>
				<div className={css.actionTitle}>
					<span className={css.actionName}>{data.title}</span>
				</div>
				<hr />
				{data.results.map((x, i) => (
					<Result key={i} action={x} />
				))}
			</div>
		);
	}
}
