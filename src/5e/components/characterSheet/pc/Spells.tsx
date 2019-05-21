import React, { ReactNode } from 'react';

import styles from './Spells.module.scss';
import { PlayerCharacter, CharacterSpell } from '../../../models/Character';
import Spell from './Spell';
import SpellSlot from './SpellSlot';
import { ChatMessageData } from '../../../../models/ChatMessage';

interface Props {
	character: PlayerCharacter;
	spells: CharacterSpell[];
	sendMessage: (message: string, data?: ChatMessageData) => void;
}

export default class Spells extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character } = this.props;

		const spells = (character.spells || []).map(
			(spell, idx): ReactNode => (
				<Spell
					key={idx}
					prepared={spell.prepared}
					spell={this.props.spells.find(y => y.id === spell.spellId)}
					{...this.props}
				/>
			)
		);

		return (
			<div className={styles.spells}>
				<div className={styles.wrapper}>
					<div>Spell slots:</div>
					<div className={`${styles.slots} row`}>
						<SpellSlot slot={1} character={character} />
						<SpellSlot slot={2} character={character} />
						<SpellSlot slot={3} character={character} />
						<SpellSlot slot={4} character={character} />
						<SpellSlot slot={5} character={character} />
						<SpellSlot slot={6} character={character} />
						<SpellSlot slot={7} character={character} />
						<SpellSlot slot={8} character={character} />
						<SpellSlot slot={9} character={character} />
					</div>
					<div>Spells:</div>
					<div className={styles.header}>
						<span className={styles.name}>Name</span>
						<span className={styles.school}>School</span>
						<span className={styles.level}>Level</span>
					</div>
					{spells}
				</div>
				<div className={styles.title}>Spells</div>
			</div>
		);
	}
}
