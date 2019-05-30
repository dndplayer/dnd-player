import React, { ReactNode } from 'react';

import styles from './Spells.module.scss';
import pcStyles from './PlayerCharacterSheet.module.scss';
import { PlayerCharacter, CharacterSpell } from '../../../models/Character';
import Spell from './Spell';
import SpellSlot from './SpellSlot';
import { ChatMessageData } from '../../../../models/ChatMessage';

interface Props {
	character: PlayerCharacter;
	spells: CharacterSpell[];
	sendMessage: (message: string, data?: ChatMessageData) => void;
	updatePlayerCharacter: (characterId: string, character: PlayerCharacter) => void;
}

export default class Spells extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character } = this.props;

		const innateSpellcastingLevels = (character.levels || [])
			.filter(x => x.className.match(/cleric|druid|paladin/))
			.map(x => ({
				className: x.className,
				maxSpellLevel: Math.ceil(x.level / 2)
			}));
		const classSpells = this.props.spells
			.filter(x =>
				(x.classes || []).some(y =>
					innateSpellcastingLevels.some(
						z => z.className === y && z.maxSpellLevel >= x.level
					)
				)
			)
			.map(x => ({
				spellId: x.id,
				prepared: (character.spells || []).some(y => y.prepared && y.spellId === x.id)
			}));

		const spells = []
			.concat(
				classSpells,
				(character.spells || []).filter(
					y => !classSpells.some(z => z.spellId === y.spellId)
				)
			)
			.map(x => ({
				ref: x,
				spell: this.props.spells.find(y => y.id === x.spellId)
			}))
			.sort((x, y) =>
				x.spell.level > y.spell.level
					? 1
					: x.spell.level < y.spell.level
					? -1
					: x.spell.name > y.spell.name
					? 1
					: -1
			)
			.map(
				(spell, idx): ReactNode => (
					<Spell
						key={idx}
						prepared={spell.ref.prepared}
						spell={spell.spell}
						{...this.props}
					/>
				)
			);

		if (!spells.length) {
			return null;
		}

		return (
			<div className={styles.spells}>
				<div className={pcStyles.subtitle}>Spellcasting</div>
				<div className={styles.wrapper}>
					<div>Spell slots:</div>
					<div className={`${styles.slots} row`}>
						<SpellSlot
							slot={1}
							character={character}
							updatePlayerCharacter={this.props.updatePlayerCharacter}
						/>
						<SpellSlot
							slot={2}
							character={character}
							updatePlayerCharacter={this.props.updatePlayerCharacter}
						/>
						<SpellSlot
							slot={3}
							character={character}
							updatePlayerCharacter={this.props.updatePlayerCharacter}
						/>
						<SpellSlot
							slot={4}
							character={character}
							updatePlayerCharacter={this.props.updatePlayerCharacter}
						/>
						<SpellSlot
							slot={5}
							character={character}
							updatePlayerCharacter={this.props.updatePlayerCharacter}
						/>
						<SpellSlot
							slot={6}
							character={character}
							updatePlayerCharacter={this.props.updatePlayerCharacter}
						/>
						<SpellSlot
							slot={7}
							character={character}
							updatePlayerCharacter={this.props.updatePlayerCharacter}
						/>
						<SpellSlot
							slot={8}
							character={character}
							updatePlayerCharacter={this.props.updatePlayerCharacter}
						/>
						<SpellSlot
							slot={9}
							character={character}
							updatePlayerCharacter={this.props.updatePlayerCharacter}
						/>
					</div>
					<div>Spells:</div>
					<div className={styles.header}>
						<span className={styles.name}>Name</span>
						<span className={styles.school}>School</span>
						<span className={styles.level}>Level</span>
					</div>
					{spells}
				</div>
			</div>
		);
	}
}
