import React, { ReactNode } from 'react';

import './PlayerCharacterSheet.css';
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

	handleClick(e, advantage: number): void {
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
