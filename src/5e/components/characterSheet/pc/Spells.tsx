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
			);

		const spellGroups = {};
		for (const idx in spells) {
			const s = spells[idx];
			if (!spellGroups[s.spell.level]) {
				spellGroups[s.spell.level] = [];
			}

			spellGroups[s.spell.level].push(
				<Spell key={idx} prepared={s.ref.prepared} spell={s.spell} {...this.props} />
			);
		}

		if (!spells.length) {
			return null;
		}

		const slots = [];
		const slots2 = [];
		for (let i = 0; i <= 9; i++) {
			(i < 5 ? slots : slots2).push(
				<SpellSlot
					key={i}
					slot={i}
					character={character}
					updatePlayerCharacter={this.props.updatePlayerCharacter}
				>
					{spellGroups[i]}
				</SpellSlot>
			);
		}

		return (
			<div className={styles.spells}>
				<div className={pcStyles.subtitle}>Spellcasting</div>
				<div className={pcStyles.row}>
					<div className={styles.wrapper}>{slots}</div>
					<div className={styles.wrapper}>{slots2}</div>
				</div>
			</div>
		);
	}
}
