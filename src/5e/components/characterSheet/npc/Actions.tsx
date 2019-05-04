import React, { ReactNode } from 'react';

import { ChatMessageData } from '../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheet.module.css';
import { NonPlayerCharacter } from '../../../models/Character';
import {
	AttackEffectType,
	TextAttackEffect,
	ToHitAttackEffect,
	DamageAttackEffect
} from '../../../5eRules';
import CharacterActionHelper from '../../../CharacterActionHelper';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	character: NonPlayerCharacter;
	actionProperty: string;
}

export default class Actions extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character, actionProperty } = this.props;

		if (!character[actionProperty] || !character[actionProperty].length) {
			return null;
		}

		const actions = [];
		for (const actionIdx in character[actionProperty]) {
			const action = character[actionProperty][actionIdx];
			const effects = action.effects.map((effect, idx) => {
				switch (effect.type) {
					case AttackEffectType.Text:
						const textEffect = effect as TextAttackEffect;
						return <span key={idx}>{textEffect.text}</span>;
					case AttackEffectType.ToHit:
						const toHitEffect = effect as ToHitAttackEffect;
						return (
							<span key={idx}>
								{toHitEffect.modifier} to hit, range {action.range} ft.
							</span>
						);
					case AttackEffectType.Damage:
						const damageEffect = effect as DamageAttackEffect;
						return (
							<span key={idx}>
								Hit: {damageEffect.diceCount}d{damageEffect.diceSize}+
								{damageEffect.bonus} {damageEffect.damageType} damage.
							</span>
						);
					default:
						return <div key={idx} />;
				}
			});
			actions.push(
				<div
					className={css.action}
					onClick={() => this.doAction(action, 0)}
					key={actionIdx}
				>
					<span className={css.italicHeading}>{action.name}.</span>
					<span>{effects}</span>
				</div>
			);
		}

		return <div>{actions}</div>;
	}

	doAction(action, advantage) {
		CharacterActionHelper.doAction(
			this.props.character,
			action,
			advantage,
			this.props.sendMessage
		);
	}
}
