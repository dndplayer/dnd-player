import React, { ReactNode, ReactElement } from 'react';

import './CharacterSheet.css';
import { Attack, AttackEffectType, ToHitAttackEffect, DamageAttackEffect } from '../5eRules';
import {
	ChatMessageData,
	CharacterActionData,
	CharacterActionResultType,
	CharacterActionDiceRollResult,
	AdvantageType
} from '../../../models/ChatMessage';
import { DiceRoll } from 'rpg-dice-roller';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	attack: Attack;
}
interface State {}

export default class AttackBlock extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {};
		this.handleClick = this.handleClick.bind(this);
	}

	// private chatRoom: firebase.firestore.CollectionReference;

	// private cleanup: () => void;

	render(): ReactNode {
		const { attack } = this.props;
		const toHitEffect: ToHitAttackEffect = attack.effects.filter(
			x => x.type === AttackEffectType.ToHit
		)[0] as ToHitAttackEffect;
		const damageEffect: DamageAttackEffect = attack.effects.filter(
			x => x.type === AttackEffectType.Damage
		)[0] as DamageAttackEffect;

		return (
			<div className="attack" onClick={e => this.handleClick(e, 0)}>
				{toHitEffect && (
					<div className="popup-advantage" onClick={e => this.handleClick(e, 1)}>
						A
					</div>
				)}
				{toHitEffect !== undefined && (
					<div className="popup-disadvantage" onClick={e => this.handleClick(e, -1)}>
						D
					</div>
				)}
				<div className="attack-name">
					<span>{attack.name}</span>
				</div>
				<div className="attack-range">{attack.range} ft.</div>
				<div className="attack-toHit">
					{toHitEffect && (
						<div>
							<div className="attack-toHit-symbol">
								{toHitEffect.modifier < 0 ? '-' : '+'}
							</div>
							<div className="attack-toHit-number">
								{Math.abs(toHitEffect.modifier)}
							</div>
						</div>
					)}
					{/*attack.saveDC !== undefined && (
						<div className="attack-toHit-number">
							DC {attack.saveDC} {Rules.getShortAbilityName(attack.saveType)}
						</div>
					)*/}
				</div>
				<div className="attack-damage">
					{damageEffect.diceCount}d{damageEffect.diceType}+{damageEffect.bonus || 0}{' '}
					{damageEffect.damageType}
				</div>
				<div className="attack-notes">Notes</div>
			</div>
		);
	}

	componentDidMount(): void {}
	componentWillUnmount(): void {}

	handleClick(e, advantage: number): void {
		const attack = this.props.attack;
		let crit = false;

		const data: CharacterActionData = {
			type: 'action',
			title: attack.name,
			results: []
		};

		for (const effect of attack.effects) {
			switch (effect.type) {
				case AttackEffectType.ToHit:
					const toHitEffect = effect as ToHitAttackEffect;
					const modifierStr =
						(toHitEffect.modifier < 0 ? '' : '+') + toHitEffect.modifier;
					const result: CharacterActionDiceRollResult = {
						advantage: advantage,
						modifier: toHitEffect.modifier,
						type: CharacterActionResultType.DiceRoll,
						rolls: []
					};

					const roll1 = new DiceRoll('d20' + modifierStr);
					const roll1Details = roll1.toString().match(/.*?: (.*?) =/)[1];
					const roll1CritSuccess = roll1.rolls[0][0] === (toHitEffect.critRange || 20);
					const roll1CritFail = roll1.rolls[0][0] === 1;

					let roll2: DiceRoll;
					let roll2Details: string;
					let roll2CritSuccess: boolean;
					let roll2CritFail: boolean;
					if (advantage) {
						roll2 = new DiceRoll('d20' + modifierStr);
						roll2Details = roll2.toString().match(/.*?: (.*?) =/)[1];
						roll2CritSuccess = roll2.rolls[0][0] === (toHitEffect.critRange || 20);
						roll2CritFail = roll2.rolls[0][0] === 1;
					}

					crit =
						advantage >= 0
							? roll1CritSuccess || roll2CritSuccess
							: roll1CritSuccess && roll2CritSuccess;

					result.rolls.push({
						total: roll1.total,
						critFail: roll1CritFail,
						critSuccess: roll1CritSuccess,
						details: roll1Details,
						ignore:
							(roll2 || false) &&
							((advantage > 0 && roll1.total < roll2.total) ||
								roll1.total > roll2.total)
					});
					if (roll2) {
						result.rolls.push({
							total: roll2.total,
							critFail: roll2CritFail,
							critSuccess: roll2CritSuccess,
							details: roll2Details,
							ignore:
								(advantage > 0 && roll1.total >= roll2.total) ||
								roll1.total <= roll2.total
						});
					}
					data.results.push(result);
					break;
				case AttackEffectType.Damage:
					const damageEffect = effect as DamageAttackEffect;
					const damageRoll = new DiceRoll(
						`${damageEffect.diceCount * (crit ? 2 : 1)}d${
							damageEffect.diceType
						}+${damageEffect.bonus || 0}`
					);
					const result2: CharacterActionDiceRollResult = {
						advantage: AdvantageType.None,
						modifier: damageEffect.bonus,
						type: CharacterActionResultType.DiceRoll,
						rolls: []
					};

					const damageRollDetails = damageRoll.toString().match(/.*?: (.*?) =/)[1];
					result2.rolls.push({
						critFail: false,
						critSuccess: false,
						details: damageRollDetails,
						ignore: false,
						total: damageRoll.total
					});
					data.results.push(result2);
					break;
				default:
					throw new Error(`Unexpected attack effect ${effect.type}.`);
			}
		}

		this.props.sendMessage('', data);
	}
}
