import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheet.module.css';
import { NonPlayerCharacter } from '../../../models/Character';
import Skill from './Skill';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	character: NonPlayerCharacter;
}

export default class Skills extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character } = this.props;

		if (!character.skills || !character.skills.length) {
			return null;
		}

		const skills = [];
		for (const skillIdx in character.skills) {
			const skill = character.skills[skillIdx];
			skills.push(<Skill key={skillIdx} skill={skill} {...this.props} />);
		}

		return (
			<div className="row">
				<span className={css.boldHeading}>Skills</span>
				{skills}
			</div>
		);
	}
}
