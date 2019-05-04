import React, { ReactNode } from 'react';

import css from './NonPlayerCharacterSheetEditor.module.css';
import { NonPlayerCharacter } from '../../../../models/Character';
import SaveEditor from './SaveEditor';

interface Props {
	character: NonPlayerCharacter;
	updateCharacterProperty: (property: string, value: any) => void;
}

export default class SavesEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const update = this.update.bind(this);
		const { character } = this.props;
		return (
			<div className="row">
				<span className={css.boldHeading}>Saving Throws</span>
				<div className={`${css.savesContainer} ${css.row}`}>
					<SaveEditor type="strength" character={character} updateSaveProperty={update} />
					<SaveEditor
						type="dexterity"
						character={character}
						updateSaveProperty={update}
					/>
					<SaveEditor
						type="constitution"
						character={character}
						updateSaveProperty={update}
					/>
					<SaveEditor
						type="intelligence"
						character={character}
						updateSaveProperty={update}
					/>
					<SaveEditor type="wisdom" character={character} updateSaveProperty={update} />
					<SaveEditor type="charisma" character={character} updateSaveProperty={update} />
				</div>
			</div>
		);
	}

	update(type: string, value: number): void {
		const save = { ...this.props.character.saves };
		save[type] = value;
		this.props.updateCharacterProperty('saves', save);
	}
}
