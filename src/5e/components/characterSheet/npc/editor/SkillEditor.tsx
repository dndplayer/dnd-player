import React, { ReactNode } from 'react';

import css from './NonPlayerCharacterSheetEditor.module.css';
import { NonPlayerCharacterSkill } from '../../../../models/Character';
import Rules from '../../../../5eRules';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';

interface Props {
	updateSkillProperty: (property: string, value: any) => void;
	skill: NonPlayerCharacterSkill;
	removeSkill: () => void;
}

export default class SkillEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { skill } = this.props;
		const options = [];
		for (const i in Rules.skillNameMap) {
			options.push(
				<option key={i} value={i}>
					{Rules.skillNameMap[i]}
				</option>
			);
		}

		return (
			<div className={css.skill}>
				<div
					className={css.button}
					onClick={this.props.removeSkill}
					style={{ background: '#333' }}
				>
					<Icon path={mdiDelete} size={1} color={'#ccc'} />
				</div>
				<select
					value={skill.skill}
					onChange={(e): void => this.props.updateSkillProperty('skill', e.target.value)}
				>
					{options}
				</select>
				<input
					type="number"
					min="-30"
					max="+30"
					value={skill.modifier}
					onChange={(e): void =>
						this.props.updateSkillProperty('modifier', e.target.value)
					}
				/>
			</div>
		);
	}
}
