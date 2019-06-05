import { CharacterAttack, Character, CharacterSpell } from './models/Character';

import {
	CharacterActionData,
	CharacterActionResult,
	CharacterActionDiceRollResult,
	CharacterActionResultType,
	AdvantageType,
	CharacterActionConditionResult,
	CharacterActionTextResult,
	RollData
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
	public static doBasicRoll(
		character: Character,
		type: string,
		title: string,
		modifier: number,
		advantage: number,
		sendMessage: (msg: string, data: any) => void
	): void {
		const modifierStr = (modifier < 0 ? '' : '+') + modifier;
		const roll = new DiceRoll('d20' + modifierStr);

		const data: RollData = {
			pcId: character.id,
			characterName: character.name,
			npcTokenId: null,
			type: 'roll',
			rollType: type,
			rollName: title,
			modifier: modifierStr,
			roll1Total: roll.total,
			roll1Details: roll.toString().match(/.*?: (.*?) =/)[1],
			roll1CritSuccess: roll.rolls[0][0] === 20,
			roll1CritFail: roll.rolls[0][0] === 1
		};

		if (advantage) {
			const roll2 = new DiceRoll('d20' + modifierStr);
			data.rollAdvantageType = advantage;
			data.roll2Total = roll2.total;
			data.roll2Details = roll2.toString().match(/.*?: (.*?) =/)[1];
			data.roll2CritSuccess = roll2.rolls[0][0] === 20;
			data.roll2CritFail = roll2.rolls[0][0] === 1;
		}

		sendMessage('', data);
	}

	public static doSpell(
		character: Character,
		spell: CharacterSpell,
		advantage: number,
		sendMessage: (msg: string, data: any) => void
	): void {
		let crit = false;

		const data: CharacterActionData = {
			type: 'spell',
			title: spell.name,
			characterName: character.name,
			results: []
		};

		// empty spaces at the end of the lines are important here.
		const r: CharacterActionTextResult = {
			type: CharacterActionResultType.Text,
			text: `*${
				spell.level ? `Level ${spell.level} ${spell.school}` : `${spell.school} cantrip`
			} ${spell.ritual ? '(ritual)' : ''}*  
**Casting Time**: ${spell.time}  
**Range**: ${spell.range}  
**Components**: ${spell.verbal ? 'V' : ''}${spell.somatic ? 'S' : ''}${
				spell.material ? `M (${spell.material})` : ''
			}  
**Duration**: ${spell.duration}

---`
		};

		data.results.push(r);

		for (const effect of spell.effects) {
			const result = CharacterActionHelper.applyEffect(effect, advantage, crit);
			crit = result.crit;
			data.results.push(...result.result);
		}

		for (const effect of spell.effectsHigherLevel || []) {
			const result = CharacterActionHelper.applyEffect(effect, advantage, crit);
			crit = result.crit;
			data.results.push(...result.result);
		}

		sendMessage('', data);
	}

	public static doAction(
		character: Character,
		action: CharacterAttack & Attack,
		advantage: number,
		sendMessage: (msg: string, data: any) => void
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
			data.results.push(...result.result);
		}

		sendMessage('', data);
	}

	static applyEffect(
		effect: AttackEffect,
		advantage: number,
		crit: boolean
	): { result: CharacterActionResult[]; crit: boolean } {
		switch (effect.type) {
			case AttackEffectType.ToHit:
				const e = effect as ToHitAttackEffect;
				const result = this.handleToHit(e.modifier, e.critRange, advantage, crit);
				return { result: [result.result], crit: result.crit };
			case AttackEffectType.Damage:
				const damageEffect = effect as DamageAttackEffect;
				return {
					result: [
						this.handleDamage(
							damageEffect.diceCount,
							damageEffect.diceSize,
							damageEffect.bonus,
							damageEffect.damageType,
							crit
						)
					],
					crit
				};
			case AttackEffectType.SavingThrow:
				const saveEffect = effect as SavingThrowAttackEffect;
				const result3: CharacterActionConditionResult = {
					type: CharacterActionResultType.Condition,
					condition: `DC ${saveEffect.saveDC} ${Rules.getLongAbilityName(
						saveEffect.saveType
					)} save`,
					onSuccess: this.applyEffect(saveEffect.onSave, 0, crit).result[0],
					onFailure: this.applyEffect(saveEffect.onFail, 0, crit).result[0]
				};
				return { result: [result3], crit };
			case AttackEffectType.Text:
				const textEffect = effect as TextAttackEffect;
				let t = textEffect.text;
				let match: RegExpMatchArray;
				const results = [];
				do {
					match = t.match(/{{(.*?)}}\s*(to hit,?\s?)?/);
					if (match) {
						// to-hit roll
						const idx = t.indexOf(match[0]);
						const previousText: CharacterActionTextResult = {
							type: CharacterActionResultType.Text,
							text: t.substr(0, idx)
						};
						results.push(previousText);
						t = t.substr(idx + match[0].length);
						const toHit = this.handleToHit(parseInt(match[1]), null, advantage, crit);
						crit = crit || toHit.crit;
						results.push(toHit.result);
					}
					match = t.match(/\[\[(.*?)\]\]\s*((\w*) damage)?[.,]?/);
					if (match) {
						// damage roll
						const idx = t.indexOf(match[0]);
						const previousText: CharacterActionTextResult = {
							type: CharacterActionResultType.Text,
							text: t.substr(0, idx)
						};
						results.push(previousText);
						t = t.substr(idx + match[0].length);
						const diceResult = match[1]
							.replace(/ /g, '')
							.match(/(\d*)d(\d+)([+-]\d+)?/);
						const diceCount = parseInt(diceResult[1] || '1');
						const diceSize = parseInt(diceResult[2]);
						const bonus = diceResult[3] ? parseInt(diceResult[3]) : 0;

						const damage = this.handleDamage(
							diceCount,
							diceSize,
							bonus,
							match[2] || '',
							match[0].indexOf('!') >= 0 && crit
						);
						results.push(damage);
					}
				} while (match);
				if (t && t.match(/\w/)) {
					const result4: CharacterActionTextResult = {
						type: CharacterActionResultType.Text,
						text: t
					};
					results.push(result4);
				}
				return { result: results, crit };
			default:
				const result5: CharacterActionTextResult = {
					type: CharacterActionResultType.Text,
					text: `Unexpected attack effect ${effect.type}!`
				};
				return { result: [result5], crit };
		}
	}

	static handleToHit(
		modifier: number,
		critRange: number,
		advantage: number,
		crit: boolean
	): { result: CharacterActionDiceRollResult; crit: boolean } {
		const modifierStr = (modifier < 0 ? '' : '+') + modifier;
		const result: CharacterActionDiceRollResult = {
			advantage: advantage,
			modifier: modifier,
			type: CharacterActionResultType.DiceRoll,
			rolls: []
		};

		const roll1 = new DiceRoll('d20' + modifierStr);
		const roll1Details = roll1.toString().match(/.*?: (.*?) =/)[1];
		const roll1CritSuccess = roll1.rolls[0][0] === (critRange || 20);
		const roll1CritFail = roll1.rolls[0][0] === 1;

		let roll2: DiceRoll;
		let roll2Details: string;
		let roll2CritSuccess: boolean;
		let roll2CritFail: boolean;
		if (advantage) {
			roll2 = new DiceRoll('d20' + modifierStr);
			roll2Details = roll2.toString().match(/.*?: (.*?) =/)[1];
			roll2CritSuccess = roll2.rolls[0][0] === (critRange || 20);
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
		return { result: result, crit };
	}

	static handleDamage(
		diceCount: number,
		diceSize: number,
		bonus: number,
		damageType: string,
		crit: boolean
	): CharacterActionDiceRollResult {
		const b = bonus || 0;

		const damageRoll = new DiceRoll(
			`${diceCount * (crit ? 2 : 1)}d${diceSize}${b ? (b > 0 ? `+${b}` : b) : ''}`
		);
		const result2: CharacterActionDiceRollResult = {
			advantage: AdvantageType.None,
			modifier: bonus || 0,
			type: CharacterActionResultType.DiceRoll,
			rolls: []
		};

		const damageRollDetails = damageRoll.toString().match(/.*?: (.*?) =/)[1];
		result2.rolls.push({
			critFail: false,
			critSuccess: false,
			details: damageRollDetails,
			ignore: false,
			total: Math.max(0, damageRoll.total),
			suffix: damageType
		});
		return result2;
	}
}
