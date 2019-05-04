import React, { ReactNode } from 'react';

import css from './NonPlayerCharacterSheetEditor.module.css';
import EffectEditor from './EffectEditor';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { AttackEffect } from '../../../../5eRules';

interface Props {
	effects: AttackEffect[];
	updateEffects: (effects: AttackEffect[]) => void;
}

export default class EffectsEditor extends React.Component<Props, {}> {
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
