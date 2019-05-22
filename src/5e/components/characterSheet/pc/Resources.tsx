import React, { ReactNode, ReactElement } from 'react';

import styles from './Equipment.module.scss';
import pcStyles from './PlayerCharacterSheet.module.scss';

import { PlayerCharacter, CharacterResource } from '../../../models/Character';
import InlineCalculator from '../../../../components/util/InlineCalculator';

interface Props {
	character: PlayerCharacter;
	updatePlayerCharacter: (characterId: string, character: PlayerCharacter) => void;
}

export default class Resources extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character } = this.props;

		const resources = (character.resources || []).map(
			(item, idx): ReactElement => (
				<div key={idx}>
					<div>{item.name}</div>
					<div className={pcStyles.row}>
						<InlineCalculator
							value={item.quantity}
							onEnter={(val): void => this.updateResource(item, val)}
						/>
						<span>/ {item.max}</span>
					</div>
				</div>
			)
		);

		return (
			<div className={styles.resources}>
				<div className={styles.wrapper}>{resources}</div>
				<div className={styles.title}>Resources</div>
			</div>
		);
	}

	updateResource(item: CharacterResource, val: number): void {
		const { character, updatePlayerCharacter } = this.props;
		const resources = character.resources.map(x => ({ ...x }));
		resources.find(x => x.name === item.name).quantity = val;

		updatePlayerCharacter(character.id, {
			...character,
			resources: resources
		});
	}
}
