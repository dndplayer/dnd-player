import {
	CharacterAttack,
	Character,
	CharacterSpell,
	TextCharacterAttackEffect
} from './models/Character';

import {
	CharacterActionData,
	CharacterActionResult,
	CharacterActionDiceRollResult,
	CharacterActionResultType,
	AdvantageType,
	CharacterActionConditionResult,
	CharacterActionTextResult
} from '../models/ChatMessage';

import Rules, {
	AttackEffect,
	AttackEffectType,
	ToHitAttackEffect,
	DamageAttackEffect,
	SavingThrowAttackEffect,
	TextAttackEffect,
	Attack
} from './5eRules';

import { DiceRoll } from 'rpg-dice-roller';

export default class CharacterActionHelper {
	public static doSpell(
		character: Character,
		action: CharacterSpell,
		advantage: number,
		sendMessage: (string, any) => void
	): void {
		let crit = false;

		const data: CharacterActionData = {
			type: 'spell',
			title: action.name,
			characterName: character.name,
			results: []
		};

		const r: CharacterActionTextResult = {
			type: CharacterActionResultType.Text,
			text: `time: ${action.time}, duration: ${action.duration}${action.range}${
				action.concentration ? ', Concentration' : ''
			}`
		};

		data.results.push(r);

		for (const effect of action.effects) {
			const result = CharacterActionHelper.applyEffect(effect, advantage, crit);
			crit = result.crit;
			data.results.push(result.result);
		}

		for (const effect of action.effectsHigherLevel || []) {
			const result = CharacterActionHelper.applyEffect(effect, advantage, crit);
			crit = result.crit;
			data.results.push(result.result);
		}

		sendMessage('', data);
	}

	public static doAction(
		character: Character,
		action: CharacterAttack & Attack,
		advantage: number,
		sendMessage: (string, any) => void
	): void {
		let crit = false;

		const data: CharacterActionData = {
			type: 'action',
			title: action.title || action.name,
			characterName: character.name,
			results: []
		};

		for (const effect of action.effects) {
			const result = CharacterActionHelper.applyEffect(effect, advantage, crit);
			crit = result.crit;
			data.results.push(result.result);
		}

		sendMessage('', data);
	}

	static applyEffect(
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

				const ignore1 =
					(roll2 || false) &&
					((advantage > 0 && roll1.total < roll2.total) ||
						(advantage < 0 && roll1.total > roll2.total));

				result.rolls.push({
					total: roll1.total,
					critFail: roll1CritFail,
					critSuccess: roll1CritSuccess,
					details: roll1Details,
					suffix: ignore1 ? '' : 'to hit',
					ignore: ignore1
				});
				if (roll2) {
					const ignore2 =
						(advantage > 0 && roll1.total >= roll2.total) ||
						(advantage < 0 && roll1.total <= roll2.total);
					result.rolls.push({
						total: roll2.total,
						critFail: roll2CritFail,
						critSuccess: roll2CritSuccess,
						details: roll2Details,
						suffix: ignore2 ? '' : 'to hit',
						ignore: ignore2
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
					modifier: damageEffect.bonus || 0,
					type: CharacterActionResultType.DiceRoll,
					rolls: []
				};

				const damageRollDetails = damageRoll.toString().match(/.*?: (.*?) =/)[1];
				result2.rolls.push({
					critFail: false,
					critSuccess: false,
					details: damageRollDetails,
					ignore: false,
					total: damageRoll.total,
					suffix: damageEffect.damageType
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
}
