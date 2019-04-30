import {
	CharacterAttackEffect,
	PlayerCharacter,
	ToHitCharacterAttackEffect,
	DamageCharacterAttackEffect,
	SavingThrowCharacterAttackEffect,
	TextCharacterAttackEffect
} from './models/Character';
import Rules, {
	ToHitAttackEffect,
	AttackEffectType,
	DamageAttackEffect,
	SavingThrowAttackEffect,
	TextAttackEffect,
	AttackEffect
} from './5eRules';

export default class CharacterEffects {
	static attackEffectMap = {
		0: CharacterEffects.mapToHitCharacterEffect, // ToHit
		1: CharacterEffects.mapDamageCharacterEffect, // Damage
		2: CharacterEffects.mapSavingThrowCharacterEffect, // SavingThrow
		3: CharacterEffects.mapTextCharacterEffect // Text
	};

	public static mapCharacterAttackEffect(
		effect: CharacterAttackEffect,
		character: PlayerCharacter
	): AttackEffect {
		const fn = this.attackEffectMap[effect.type];
		if (fn) {
			return fn(effect, character);
		}

		const unknown: TextAttackEffect = {
			type: AttackEffectType.Text,
			text: `Unknown attack type ${effect.type}!`
		};
		return unknown;
	}

	static mapToHitCharacterEffect(
		effect: CharacterAttackEffect,
		character: PlayerCharacter
	): ToHitAttackEffect {
		const toHitEffect = effect as ToHitCharacterAttackEffect;
		return {
			type: AttackEffectType.ToHit,
			modifier:
				Rules.getAbilityModifier(character, toHitEffect.ability) +
				Rules.getProficiencyBonus(character),
			critRange: 20
		};
	}

	static mapDamageCharacterEffect(
		effect: CharacterAttackEffect,
		character: PlayerCharacter
	): DamageAttackEffect {
		const damageEffect = effect as DamageCharacterAttackEffect;
		return {
			type: AttackEffectType.Damage,
			damageType: damageEffect.damageType,
			diceCount: damageEffect.diceCount,
			diceSize: damageEffect.diceSize,
			bonus:
				(damageEffect.bonus || 0) +
				(damageEffect.ability
					? Rules.getAbilityModifier(character, damageEffect.ability)
					: 0)
		};
	}

	static mapSavingThrowCharacterEffect(
		effect: CharacterAttackEffect,
		character: PlayerCharacter
	): SavingThrowAttackEffect {
		const savingEffect = effect as SavingThrowCharacterAttackEffect;
		return {
			type: AttackEffectType.SavingThrow,
			saveType: savingEffect.saveType,
			saveDC: 10 + Rules.getAbilityModifier(character, savingEffect.DCAbility),
			onSave: CharacterEffects.mapCharacterAttackEffect(savingEffect.onSave, character),
			onFail: CharacterEffects.mapCharacterAttackEffect(savingEffect.onFail, character)
		};
	}

	static mapTextCharacterEffect(effect: CharacterAttackEffect): TextAttackEffect {
		const textEffect = effect as TextCharacterAttackEffect;
		return { type: AttackEffectType.Text, text: textEffect.text };
	}
}
