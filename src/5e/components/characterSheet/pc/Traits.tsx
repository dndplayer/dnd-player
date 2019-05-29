import React, { ReactNode } from 'react';

import styles from './PlayerCharacterSheet.module.scss';
import { PlayerCharacter, CharacterTrait } from '../../../models/Character';
import Rollable from '../../Rollable';

interface Props {
	character: PlayerCharacter;
	sendMessage: (msg: string, data: any) => void;
}

export default class Traits extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {};
	}

	render(): ReactNode {
		const { character } = this.props;

		const traits = (character.traits || []).map(
			(item, idx): ReactNode => (
				<div className={styles.trait}>
					<Rollable key={idx} onClick={(): void => this.onClick(item)}>
						<span className={styles.title}>{item.name}.</span>
					</Rollable>
					<span>{item.description}</span>
				</div>
			)
		);

		return (
			<div className={styles.traits}>
				<div className={styles.subtitle}>Traits</div>
				<div className={styles.wrapper}>{traits}</div>
			</div>
		);
	}

	onClick(trait: CharacterTrait): void {
		this.props.sendMessage('', {
			type: 'info',
			characterName: this.props.character.name,
			title: `Trait: ${trait.name}`,
			details: trait.description
		});
	}
}
