import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.scss';
import { PlayerCharacter } from '../../../../models/Character';
import Rules from '../../../../5eRules';

interface Props {
	updateCharacterProperty: (property: string, value: any) => void;
	character: PlayerCharacter;
}

export default class SkillsEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		return (
			<div className={css.row}>
				<span>Skills:</span>
				<div className={css.column}>
					<div className={css.row}>
						<SkillEditor prop="acrobatics" {...this.props} />
						<SkillEditor prop="animalHandling" {...this.props} />
						<SkillEditor prop="arcana" {...this.props} />
						<SkillEditor prop="athletics" {...this.props} />
						<SkillEditor prop="deception" {...this.props} />
					</div>
					<div className={css.row}>
						<SkillEditor prop="history" {...this.props} />
						<SkillEditor prop="insight" {...this.props} />
						<SkillEditor prop="intimidation" {...this.props} />
						<SkillEditor prop="investigation" {...this.props} />
						<SkillEditor prop="medicine" {...this.props} />
					</div>
					<div className={css.row}>
						<SkillEditor prop="nature" {...this.props} />
						<SkillEditor prop="perception" {...this.props} />
						<SkillEditor prop="performance" {...this.props} />
						<SkillEditor prop="persuasion" {...this.props} />
						<SkillEditor prop="religion" {...this.props} />
					</div>
					<div className={css.row}>
						<SkillEditor prop="sleightOfHand" {...this.props} />
						<SkillEditor prop="stealth" {...this.props} />
						<SkillEditor prop="survival" {...this.props} />
					</div>
				</div>
			</div>
		);
	}
}

interface InnerProps {
	prop: string;
	character: PlayerCharacter;
	updateCharacterProperty: (property: string, value: any) => void;
}
class SkillEditor extends React.Component<InnerProps, {}> {
	render(): ReactNode {
		const { character, prop } = this.props;
		return (
			<div className={css.column}>
				<div>{Rules.getLongSkillName(prop)}</div>
				<select
					value={(character.skills || {})[prop]}
					onChange={e => this.updateSkillProperty(e.target.value)}
				>
					<option value={0}>Not proficient</option>
					<option value={0.5}>Half proficient</option>
					<option value={1}>Proficient</option>
					<option value={2}>Expertise</option>
				</select>
			</div>
		);
	}

	updateSkillProperty(value): void {
		this.props.updateCharacterProperty('skills', {
			...this.props.character.skills,
			[this.props.prop]: value
		});
	}
}
