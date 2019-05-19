import React, { ReactNode } from 'react';

import css from './NonPlayerCharacterSheetEditor.module.css';
import { NonPlayerCharacter } from '../../../../models/Character';
import SenseEditor from './SenseEditor';

interface Props {
	character: NonPlayerCharacter;
	updateCharacterProperty: (property: string, value: any) => void;
}

export default class SensesEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const update = this.update.bind(this);
		const { character } = this.props;
		return (
			<div className="row">
				<span className={css.boldHeading}>Senses</span>
				<div className={`${css.speedContainer} ${css.row}`}>
					<div>
						<label>Blind</label>
						<input
							type="checkbox"
							name="blind"
							checked={(character.senses && character.senses.blind) || false}
							onChange={(e): void => this.update('blind', e.target.checked)}
						/>
					</div>
					<SenseEditor
						type="darkvision"
						character={character}
						updateSenseProperty={update}
					/>
					<SenseEditor
						type="blindsight"
						character={character}
						updateSenseProperty={update}
					/>
					<SenseEditor
						type="truesight"
						character={character}
						updateSenseProperty={update}
					/>
					<SenseEditor
						type="tremorsense"
						character={character}
						updateSenseProperty={update}
					/>
				</div>
			</div>
		);
	}

	update(type: string, value: any): void {
		const sense = { ...this.props.character.senses };
		sense[type] = value;
		this.props.updateCharacterProperty('senses', sense);
	}
}
