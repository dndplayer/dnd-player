import React, { ReactNode } from 'react';

import styles from './Spells.module.scss';
import { Character, CharacterSpell } from '../../../models/Character';
import Rollable from '../../Rollable';
import CharacterActionHelper from '../../../CharacterActionHelper';
import { ChatMessageData } from '../../../../models/ChatMessage';
import HoverPopup from '../../../../components/util/HoverPopup';

interface Props {
	character: Character;
	spell: CharacterSpell;
	prepared: boolean;
	sendMessage: (message: string, data?: ChatMessageData) => void;
}

export default class Spell extends React.Component<Props, {}> {
	render(): ReactNode {
		const { spell } = this.props;

		const onClick = this.onClick.bind(this);
		const content = (
			<div>
				<div className={styles.title}>{spell.name}</div>
				<div className={styles.italic}>{`Level ${spell.level} ${spell.school}`}</div>
				<div>
					<span className={styles.bold}>Casting Time:</span>
					<span>{spell.time}</span>
				</div>
				<div>
					<span className={styles.bold}>Range:</span>
					<span>{spell.range}</span>
				</div>
				<div>
					<span className={styles.bold}>Components:</span>
					<span>
						{spell.verbal && 'V'}
						{spell.somatic && 'S'}
						{spell.material && 'M'}
					</span>
				</div>
				<div>
					<span className={styles.bold}>Duration:</span>
					<span>{spell.duration}</span>
				</div>
				<hr />
				<div>{spell.effects.map(x => (x as any).text).join('\n')}</div>
				<div>{(spell.effectsHigherLevel || []).map(x => (x as any).text).join('\n')}</div>
				<div>
					<span className={styles.bold}>Classes:</span>
					<span>{spell.classes.join(', ')}</span>
				</div>
			</div>
		);

		return (
			<div className={styles.wrapper}>
				<input type="checkbox" checked={this.props.prepared} disabled />
				<HoverPopup content={content}>
					<Rollable onClick={onClick}>{spell.name}</Rollable>
				</HoverPopup>
				{spell.concentration && <span>Concentration</span>}
			</div>
		);
	}

	onClick(advantage: number): void {
		CharacterActionHelper.doSpell(
			this.props.character,
			this.props.spell,
			advantage,
			this.props.sendMessage
		);
	}
}
