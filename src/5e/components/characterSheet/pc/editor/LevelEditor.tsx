import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.css';
import { CharacterLevel } from '../../../../models/Character';
import Rules from '../../../../5eRules';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import ArrayEditor from './ArrayEditor';

export default class LevelsEditor extends ArrayEditor<CharacterLevel> {
	prop = 'levels';
	heading = 'Levels';
	mapItem(idx: string, item: CharacterLevel): React.ReactNode {
		return (
			<LevelEditor
				key={idx}
				level={item}
				updateLevelProperty={(p, v) => this.updateItemProperty(idx, p, v)}
				removeLevel={() => this.removeItem(idx)}
			/>
		);
	}
}

interface Props {
	updateLevelProperty: (property: string, value: any) => void;
	level: CharacterLevel;
	removeLevel: () => void;
}

export class LevelEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { level } = this.props;
		const options = [];
		for (const i in Rules.classNameMap) {
			options.push(
				<option key={i} value={i}>
					{Rules.classNameMap[i]}
				</option>
			);
		}

		return (
			<div className={css.level}>
				<div
					className={css.button}
					onClick={this.props.removeLevel}
					style={{ background: '#333' }}
				>
					<Icon path={mdiDelete} size={1} color={'#ccc'} />
				</div>
				<select
					value={level.className}
					onChange={e => this.props.updateLevelProperty('className', e.target.value)}
				>
					{options}
				</select>
				<input
					type="number"
					min="1"
					max="20"
					value={level.level}
					onChange={e => this.props.updateLevelProperty('level', e.target.value)}
				/>
			</div>
		);
	}
}
