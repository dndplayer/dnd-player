import React, { ReactNode } from 'react';

import css from './NonPlayerCharacterSheetEditor.module.css';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import Rules, {
	AttackEffectType,
	AttackEffect,
	ToHitAttackEffect,
	DamageAttackEffect,
	SavingThrowAttackEffect,
	TextAttackEffect
} from '../../../../5eRules';

interface Props {
	updateEffectProperty: (property: string, value: any) => void;
	effect: AttackEffect;
	removeEffect: () => void;
}

export default class EffectEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		let { effect } = this.props;

		if (!effect) {
			const textEffect: TextAttackEffect = { type: AttackEffectType.Text, text: 'No effect' };
			effect = textEffect;
		}

		let details: ReactNode;
		switch (effect.type) {
			case AttackEffectType.ToHit:
				const toHitEffect = effect as ToHitAttackEffect;
				details = <ToHitEffectEditor toHitEffect={toHitEffect} {...this.props} />;
				break;
			case AttackEffectType.Damage:
				const damageEffect = effect as DamageAttackEffect;
				details = <DamageEffectEditor damageEffect={damageEffect} {...this.props} />;
				break;
			case AttackEffectType.SavingThrow:
				const saveEffect = effect as SavingThrowAttackEffect;
				details = <SavingThrowEffectEditor saveEffect={saveEffect} {...this.props} />;
				break;
			case AttackEffectType.Text:
				const textEffect = effect as TextAttackEffect;
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
					onChange={(e): void =>
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
	toHitEffect: ToHitAttackEffect;
}
class ToHitEffectEditor extends React.Component<ToHitProps, {}> {
	render(): ReactNode {
		const { toHitEffect, updateEffectProperty } = this.props;
		return (
			<div className={css.effect}>
				<input
					value={toHitEffect.modifier}
					onChange={(e): void => updateEffectProperty('modifier', e.target.value)}
				/>
			</div>
		);
	}
}

interface DamageProps extends Props {
	damageEffect: DamageAttackEffect;
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
				<input
					value={damageEffect.bonus}
					type="number"
					onChange={e => updateEffectProperty('bonus', e.target.value)}
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
	saveEffect: SavingThrowAttackEffect;
}
class SavingThrowEffectEditor extends React.Component<SavingThrowProps, {}> {
	render(): ReactNode {
		const { saveEffect, updateEffectProperty } = this.props;
		return (
			<div className={css.effect}>
				DC
				<input
					value={saveEffect.saveDC}
					type="number"
					onChange={e => updateEffectProperty('saveDC', e.target.value)}
				/>
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
	textEffect: TextAttackEffect;
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
