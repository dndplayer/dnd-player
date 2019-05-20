import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.scss';
import {
	CharacterAttackEffect,
	TextCharacterAttackEffect,
	DamageCharacterAttackEffect,
	SavingThrowCharacterAttackEffect,
	ToHitCharacterAttackEffect
} from '../../../../models/Character';

import Icon from '@mdi/react';
import { mdiDelete, mdiPlus } from '@mdi/js';
import Rules, { AttackEffectType } from '../../../../5eRules';

interface OuterProps {
	effects: CharacterAttackEffect[];
	updateEffects: (effects: CharacterAttackEffect[]) => void;
}

export default class EffectsEditor extends React.Component<OuterProps, {}> {
	render(): ReactNode {
		const { effects } = this.props;

		return (
			<div className="column">
				<div className={`${css.column} ${css.center}`}>
					{(effects || []).map((effect, idx) => (
						<EffectEditor
							key={idx}
							effect={effect}
							updateEffectProperty={(p, v) => this.updateEffectProperty(idx, p, v)}
							removeEffect={() => this.removeEffect(idx)}
						/>
					))}
					<div className={css.button} onClick={() => this.addEffect()}>
						<Icon path={mdiPlus} size={1} color={'#ccc'} />
					</div>
				</div>
			</div>
		);
	}

	updateEffectProperty(effectIdx: number, property: string, value: any): void {
		const newEffects = [...this.props.effects];
		newEffects[effectIdx][property] = value;
		this.props.updateEffects(newEffects);
	}

	removeEffect(effectIdx: number): void {
		const newEffects = [...this.props.effects];
		newEffects.splice(effectIdx, 1);
		this.props.updateEffects(newEffects);
	}

	addEffect(): void {
		this.props.updateEffects([...(this.props.effects || []), { type: 3 }]);
	}
}

interface Props {
	updateEffectProperty: (property: string, value: any) => void;
	effect: CharacterAttackEffect;
	removeEffect: () => void;
}

export class EffectEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		let { effect } = this.props;

		if (!effect) {
			const textEffect: TextCharacterAttackEffect = {
				type: AttackEffectType.Text,
				text: 'No effect'
			};
			effect = textEffect;
		}

		let details: ReactNode;
		switch (effect.type) {
			case AttackEffectType.ToHit:
				const toHitEffect = effect as ToHitCharacterAttackEffect;
				details = <ToHitEffectEditor toHitEffect={toHitEffect} {...this.props} />;
				break;
			case AttackEffectType.Damage:
				const damageEffect = effect as DamageCharacterAttackEffect;
				details = <DamageEffectEditor damageEffect={damageEffect} {...this.props} />;
				break;
			case AttackEffectType.SavingThrow:
				const saveEffect = effect as SavingThrowCharacterAttackEffect;
				details = <SavingThrowEffectEditor saveEffect={saveEffect} {...this.props} />;
				break;
			case AttackEffectType.Text:
				const textEffect = effect as TextCharacterAttackEffect;
				details = <TextEffectEditor textEffect={textEffect} {...this.props} />;
				break;
			default:
		}
		return (
			<div className={`${css.effect} ${css.row}`}>
				<div className={css.button} onClick={this.props.removeEffect}>
					<Icon path={mdiDelete} size={1} color={'#ccc'} />
				</div>
				<select
					value={effect.type}
					onChange={e =>
						this.props.updateEffectProperty('type', parseInt(e.target.value))
					}
				>
					<option value={AttackEffectType.ToHit}>To Hit</option>
					<option value={AttackEffectType.Damage}>Damage</option>
					<option value={AttackEffectType.SavingThrow}>Saving Throw</option>
					<option value={AttackEffectType.Text}>Text</option>
				</select>
				{details}
			</div>
		);
	}
}

interface ToHitProps extends Props {
	toHitEffect: ToHitCharacterAttackEffect;
}
class ToHitEffectEditor extends React.Component<ToHitProps, {}> {
	render(): ReactNode {
		const { toHitEffect, updateEffectProperty } = this.props;
		return (
			<div className={css.effect}>
				<select
					value={toHitEffect.ability}
					onChange={e => updateEffectProperty('ability', e.target.value)}
				>
					<option value="">None</option>
					<option value="strength">Strength</option>
					<option value="dexterity">Dexterity</option>
					<option value="constitution">Constitution</option>
					<option value="intelligence">Intelligence</option>
					<option value="wisdom">Wisdom</option>
					<option value="charisma">Charisma</option>
				</select>
			</div>
		);
	}
}

interface DamageProps extends Props {
	damageEffect: DamageCharacterAttackEffect;
}
class DamageEffectEditor extends React.Component<DamageProps, {}> {
	render(): ReactNode {
		const { damageEffect, updateEffectProperty } = this.props;
		return (
			<div className={css.effect}>
				<input
					value={damageEffect.diceCount}
					type="number"
					onChange={e => updateEffectProperty('diceCount', e.target.value)}
				/>
				<select
					value={damageEffect.diceSize}
					onChange={e => updateEffectProperty('diceSize', parseInt(e.target.value))}
				>
					<option value={4}>d4</option>
					<option value={6}>d6</option>
					<option value={8}>d8</option>
					<option value={10}>d10</option>
					<option value={12}>d12</option>
				</select>
				+
				<select
					value={damageEffect.ability}
					onChange={e => updateEffectProperty('ability', e.target.value)}
				>
					<option value="">None</option>
					<option value="strength">Strength</option>
					<option value="dexterity">Dexterity</option>
					<option value="constitution">Constitution</option>
					<option value="intelligence">Intelligence</option>
					<option value="wisdom">Wisdom</option>
					<option value="charisma">Charisma</option>
				</select>
				+
				<input
					value={damageEffect.bonus}
					type="number"
					onChange={e => updateEffectProperty('bonus', parseInt(e.target.value))}
				/>
				<input
					value={damageEffect.damageType}
					onChange={e => updateEffectProperty('damageType', e.target.value)}
				/>
			</div>
		);
	}
}

interface SavingThrowProps extends Props {
	saveEffect: SavingThrowCharacterAttackEffect;
}
class SavingThrowEffectEditor extends React.Component<SavingThrowProps, {}> {
	render(): ReactNode {
		const { saveEffect, updateEffectProperty } = this.props;
		return (
			<div className={css.effect}>
				DC Ability
				<select
					value={saveEffect.DCAbility}
					onChange={e => updateEffectProperty('DCability', e.target.value)}
				>
					<option value="strength">Strength</option>
					<option value="dexterity">Dexterity</option>
					<option value="constitution">Constitution</option>
					<option value="intelligence">Intelligence</option>
					<option value="wisdom">Wisdom</option>
					<option value="charisma">Charisma</option>
				</select>
				<select
					value={saveEffect.saveType}
					onChange={e => updateEffectProperty('saveType', e.target.value)}
				>
					<option value="strength">{Rules.getSaveName('strength')}</option>
					<option value="dexterity">{Rules.getSaveName('dexterity')}</option>
					<option value="constitution">{Rules.getSaveName('constitution')}</option>
					<option value="intelligence">{Rules.getSaveName('intelligence')}</option>
					<option value="wisdom">{Rules.getSaveName('wisdom')}</option>
					<option value="charisma">{Rules.getSaveName('charisma')}</option>
				</select>
				On save:
				<EffectEditor
					effect={saveEffect.onSave}
					removeEffect={() => {}}
					updateEffectProperty={(p, v) => this.updateInnerEffectProperty('onSave', p, v)}
				/>
				On fail:
				<EffectEditor
					effect={saveEffect.onFail}
					removeEffect={() => {}}
					updateEffectProperty={(p, v) => this.updateInnerEffectProperty('onFail', p, v)}
				/>
			</div>
		);
	}

	updateInnerEffectProperty(effectProp: string, prop: string, value: any): void {
		const innerEffect = { ...this.props.effect[effectProp] };
		innerEffect[prop] = value;
		this.props.updateEffectProperty(effectProp, innerEffect);
	}
}

interface TextProps extends Props {
	textEffect: TextCharacterAttackEffect;
}
class TextEffectEditor extends React.Component<TextProps, {}> {
	render(): ReactNode {
		const { textEffect, updateEffectProperty } = this.props;
		return (
			<div className={css.effect}>
				<textarea
					value={textEffect.text}
					onChange={e => updateEffectProperty('text', e.target.value)}
				/>
			</div>
		);
	}
}
