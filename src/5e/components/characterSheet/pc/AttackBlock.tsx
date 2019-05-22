import React, { ReactNode } from 'react';

import css from './Attacks.module.scss';
import sheetCss from './PlayerCharacterSheet.module.scss';
import { Attack, AttackEffectType, ToHitAttackEffect, DamageAttackEffect } from '../../../5eRules';
import { ChatMessageData, CharacterActionData } from '../../../../models/ChatMessage';
import CharacterActionHelper from '../../../CharacterActionHelper';
import { Character } from '../../../models/Character';

interface Props {
	sendMessage: (message: string, data?: ChatMessageData) => void;
	attack: Attack;
	character: Character;
}

export default class AttackBlock extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props);

		this.state = {};
		this.handleClick = this.handleClick.bind(this);
	}

	render(): ReactNode {
		const { attack } = this.props;
		const toHitEffect: ToHitAttackEffect = attack.effects.filter(
			x => x.type === AttackEffectType.ToHit
		)[0] as ToHitAttackEffect;
		const damageEffect: DamageAttackEffect = attack.effects.filter(
			x => x.type === AttackEffectType.Damage
		)[0] as DamageAttackEffect;

		return (
			<div className={css.attack} onClick={e => this.handleClick(e, 0)}>
				{toHitEffect && (
					<div className={sheetCss.popupAdvantage} onClick={e => this.handleClick(e, 1)}>
						A
					</div>
				)}
				{toHitEffect !== undefined && (
					<div
						className={sheetCss.popupDisadvantage}
						onClick={e => this.handleClick(e, -1)}
					>
						D
					</div>
				)}
				<div className={css.attackName}>
					<span>{attack.name}</span>
				</div>
				<div className={css.attackRange}>{attack.range} ft.</div>
				<div className={css.attackToHit}>
					{toHitEffect && (
						<div>
							<div className={css.attackToHitSymbol}>
								{toHitEffect.modifier < 0 ? '-' : '+'}
							</div>
							<div className={css.attackToHitNumber}>
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
				<div className={css.attackDamage}>
					{damageEffect && (
						<div>
							{damageEffect.diceCount}d{damageEffect.diceSize}+
							{damageEffect.bonus || 0} {damageEffect.damageType}
						</div>
					)}
				</div>
			</div>
		);
	}

	handleClick(e: React.MouseEvent, advantage: number): void {
		e.stopPropagation();
		const attack = this.props.attack;
		let crit = false;

		const data: CharacterActionData = {
			type: 'action',
			characterName: this.props.character.name,
			title: attack.name,
			results: []
		};

		for (const effect of attack.effects) {
			const result = CharacterActionHelper.applyEffect(effect, advantage, crit);
			crit = result.crit;
			data.results.push(result.result);
		}

		this.props.sendMessage('', data);
	}
}
