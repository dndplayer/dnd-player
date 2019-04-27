import React, { ReactNode, ReactElement } from 'react';

import './CharacterSheet.css';
import Rules, {
	Attack,
	AttackEffectType,
	ToHitAttackEffect,
	DamageAttackEffect,
	SavingThrowAttackEffect,
	AttackEffect,
	TextAttackEffect
} from '../../5eRules';
import {
	ChatMessageData,
	CharacterActionData,
	CharacterActionResultType,
	CharacterActionDiceRollResult,
	AdvantageType,
	CharacterActionResult,
	CharacterActionTextResult,
	CharacterActionConditionResult
} from '../../../models/ChatMessage';
import { DiceRoll } from 'rpg-dice-roller';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	attack: Attack;
}

export default class AttackBlock extends React.Component<Props, {}> {
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
					{damageEffect.diceCount}d{damageEffect.diceSize}+{damageEffect.bonus || 0}{' '}
					{damageEffect.damageType}
				</div>
			</div>
		);
	}

	componentDidMount(): void {}
	componentWillUnmount(): void {}

	applyEffect(
		effect: AttackEffect,
		advantage: number,
		crit: boolean
	): { result: CharacterActionResult; crit: boolean } {
		switch (effect.type) {
			case AttackEffectType.ToHit:
				const toHitEffect = effect as ToHitAttackEffect;
				const modifierStr = (toHitEffect.modifier < 0 ? '' : '+') + toHitEffect.modifier;
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
						((advantage > 0 && roll1.total < roll2.total) || roll1.total > roll2.total)
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
				return { result, crit };
			case AttackEffectType.Damage:
				const damageEffect = effect as DamageAttackEffect;
				const damageRoll = new DiceRoll(
					`${damageEffect.diceCount * (crit ? 2 : 1)}d${
						damageEffect.diceSize
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
				return { result: result2, crit };
			case AttackEffectType.SavingThrow:
				const saveEffect = effect as SavingThrowAttackEffect;
				const result3: CharacterActionConditionResult = {
					type: CharacterActionResultType.Condition,
					condition: `DC ${saveEffect.saveDC} ${Rules.getLongAbilityName(
						saveEffect.saveType
					)} save`,
					onSuccess: this.applyEffect(saveEffect.onSave, 0, crit).result,
					onFailure: this.applyEffect(saveEffect.onFail, 0, crit).result
				};
				return { result: result3, crit };
			case AttackEffectType.Text:
				const textEffect = effect as TextAttackEffect;
				const result4: CharacterActionTextResult = {
					type: CharacterActionResultType.Text,
					text: textEffect.text
				};
				return { result: result4, crit };
			default:
				const result5: CharacterActionTextResult = {
					type: CharacterActionResultType.Text,
					text: `Unexpected attack effect ${effect.type}!`
				};
				return { result: result5, crit };
		}
	}

	handleClick(e, advantage: number): void {
		const attack = this.props.attack;
		let crit = false;

		const data: CharacterActionData = {
			type: 'action',
			title: attack.name,
			results: []
		};

		for (const effect of attack.effects) {
			const result = this.applyEffect(effect, advantage, crit);
			crit = result.crit;
			data.results.push(result.result);
		}

		this.props.sendMessage('', data);
	}
}
