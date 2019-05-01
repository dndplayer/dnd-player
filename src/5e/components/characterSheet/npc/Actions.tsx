import React, { ReactNode } from 'react';

import {
	ChatMessageData,
	CharacterActionData,
	CharacterActionResult,
	CharacterActionDiceRollResult,
	CharacterActionResultType,
	AdvantageType,
	CharacterActionConditionResult,
	CharacterActionTextResult
} from '../../../../models/ChatMessage';

import css from './NonPlayerCharacterSheet.module.css';
import { NonPlayerCharacter, CharacterAttack } from '../../../models/Character';
import Rules, {
	AttackEffectType,
	TextAttackEffect,
	ToHitAttackEffect,
	DamageAttackEffect,
	AttackEffect,
	SavingThrowAttackEffect
} from '../../../5eRules';
import { DiceRoll } from 'rpg-dice-roller';
import CharacterActionHelper from '../../../CharacterActionHelper';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	character: NonPlayerCharacter;
}

export default class Actions extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character } = this.props;

		if (!character.actions || !character.actions.length) {
			return null;
		}

		const actions = [];
		for (const action of character.actions) {
			const effects = action.effects.map(effect => {
				switch (effect.type) {
					case AttackEffectType.Text:
						const textEffect = effect as TextAttackEffect;
						return <span>{textEffect.text}</span>;
					case AttackEffectType.ToHit:
						const toHitEffect = effect as ToHitAttackEffect;
						return (
							<span>
								{toHitEffect.modifier} to hit, range {action.range} ft.
							</span>
						);
					case AttackEffectType.Damage:
						const damageEffect = effect as DamageAttackEffect;
						return (
							<span>
								Hit: {damageEffect.diceCount}d{damageEffect.diceSize}+
								{damageEffect.bonus} {damageEffect.damageType} damage.
							</span>
						);
					default:
						return <div />;
				}
			});
			actions.push(
				<div className={css.action} onClick={() => this.doAction(action, 0)}>
					<span className={css.italicHeading}>{action.title}.</span>
					<span>{effects}</span>
				</div>
			);
		}

		return <div>{actions}</div>;
	}

	doAction(action, advantage) {
		CharacterActionHelper.doAction(action, advantage, this.props.sendMessage);
	}
}
