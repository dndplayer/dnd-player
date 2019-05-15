import React, { ReactNode } from 'react';
import { CharacterActionTextResult } from '../../../models/ChatMessage';

interface Props {
	result: CharacterActionTextResult;
}

export default class TextBlock extends React.Component<Props> {
	render(): ReactNode {
		const { result } = this.props;

		return (
			<div className={`text`} style={{ marginTop: '4px' }}>
				{result.text}
			</div>
		);
	}
}
