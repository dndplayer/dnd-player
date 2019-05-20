import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.scss';
import { PlayerCharacter } from '../../../../models/Character';
import Rules from '../../../../5eRules';
import SaveEditor from './SaveEditor';

interface Props {
	ability: string;
	character: PlayerCharacter;
	updateCharacterProperty: (property: string, value: any) => void;
}

export default class AbilityScoreEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { ability, character } = this.props;

		return (
			<div className={css.columnCenter}>
				<div className={css.label}>{Rules.getShortAbilityName(ability)}</div>
				<input
					className={css.ability}
					value={character[ability]}
					type="number"
					min={0}
					max={30}
					placeholder={'10'}
					onChange={e => this.props.updateCharacterProperty(ability, e.target.value)}
				/>
				<SaveEditor prop={ability} {...this.props} />
			</div>
		);
	}
}
