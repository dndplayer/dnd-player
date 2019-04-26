import React, { ReactNode } from 'react';
import {
	CharacterActionResultType,
	CharacterActionDiceRollResult,
	CharacterActionTextResult,
	CharacterActionResult,
	CharacterActionConditionResult
} from '../../../models/ChatMessage';
import DiceRoll from './DiceRoll';
import TextBlock from './TextBlock';
import Condition from './Condition';

interface Props {
	action: CharacterActionResult;
}

export default class Result extends React.Component<Props> {
	render(): ReactNode {
		const { action } = this.props;
		switch (action.type) {
			case CharacterActionResultType.Text:
				return <TextBlock result={action as CharacterActionTextResult} />;
			case CharacterActionResultType.DiceRoll:
				return <DiceRoll result={action as CharacterActionDiceRollResult} />;
			case CharacterActionResultType.Condition:
				return <Condition result={action as CharacterActionConditionResult} />;
			default:
				throw new Error(`Unknown action type ${action.type}.`);
		}
	}
}
