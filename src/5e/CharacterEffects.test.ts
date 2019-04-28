/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AttackEffectType, TextAttackEffect } from './5eRules';
import each from 'jest-each';
import CharacterEffects from './CharacterEffects';

describe('CharacterEffects', () => {
	describe('mapCharacterAttackEffect', () => {
		it('should not crash if passed an unknown effect type', () => {
			const result: TextAttackEffect = CharacterEffects.mapCharacterAttackEffect(
				{
					type: 9999
				},
				{}
			);
			expect(result.type).toBe(AttackEffectType.Text);
		});
	});
});
