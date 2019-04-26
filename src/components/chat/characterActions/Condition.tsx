import React, { ReactNode } from 'react';
import { CharacterActionConditionResult } from '../../../models/ChatMessage';
import Result from './Result';

interface Props {
	result: CharacterActionConditionResult;
}

export default class Condition extends React.Component<Props> {
	render(): ReactNode {
		const { result } = this.props;

		return (
			<div className="column">
				<div>{result.condition}</div>
				<div className="row">
					<div className="column">
						<div>On success:</div>
						<div>
							<Result action={result.onSuccess} />
						</div>
					</div>
					<div className="column">
						<div>On failure:</div>
						<div>
							<Result action={result.onFailure} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
