import React, { ReactNode } from 'react';

import css from './NonPlayerCharacterSheetEditor.module.css';
import { NonPlayerCharacter } from '../../../../models/Character';
import SkillEditor from './SkillEditor';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';

interface Props {
	character: NonPlayerCharacter;
	updateCharacterProperty: (property: string, value: any) => void;
}

export default class SkillsEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character } = this.props;

		const skills = [];
		for (const skillIdx in character.skills) {
			const idx = skillIdx;
			const skill = character.skills[idx];
			skills.push(
				<SkillEditor
					key={idx}
					skill={skill}
					updateSkillProperty={(p, v) => this.updateSkillProperty(idx, p, v)}
					removeSkill={() => this.removeSkill(idx)}
				/>
			);
		}

		return (
			<div className="row">
				<span className={css.boldHeading}>Skills</span>
				<div className={`${css.column} ${css.center}`}>
					{skills}
					<div className={css.button} onClick={() => this.addSkill()}>
						<Icon path={mdiPlus} size={1} color={'#ccc'} />
					</div>
				</div>
			</div>
		);
	}

	updateSkillProperty(skillIdx: string, property: string, value: any): void {
		const newSkills = [...this.props.character.skills];
		newSkills[skillIdx][property] = value;
		this.props.updateCharacterProperty('skills', newSkills);
	}

	removeSkill(skillIdx: string): void {
		const newSkills = [...this.props.character.skills];
		newSkills.splice(parseInt(skillIdx), 1);
		this.props.updateCharacterProperty('skills', newSkills);
	}

	addSkill(): void {
		this.props.updateCharacterProperty('skills', [
			...(this.props.character.skills || []),
			{ skill: 'acrobatics', modifier: 0 }
		]);
	}
}
