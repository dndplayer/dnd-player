import React, { ReactNode } from 'react';

import css from './NonPlayerCharacterSheetEditor.module.css';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import EffectsEditor from './EffectsEditor';
import { Attack } from '../../../../5eRules';

interface Props {
	updateActionProperty: (property: string, value: any) => void;
	action: Attack;
	removeAction: () => void;
}

export default class ActionEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { action } = this.props;

		return (
			<div className={css.action}>
				<div className={css.button} onClick={this.props.removeAction}>
					<Icon path={mdiDelete} size={1} color={'#ccc'} />
				</div>
				<input
					className={css.italicHeading}
					value={action.name}
					placeholder="Name"
					onChange={e => this.props.updateActionProperty('name', e.target.value)}
				/>
				<EffectsEditor
					effects={action.effects}
					updateEffects={e => this.props.updateActionProperty('effects', [...e])}
				/>
			</div>
		);
	}

	removeEffect(actionIdx: string): void {
		const newEffects = [...this.props.action.effects];
		newEffects.splice(parseInt(actionIdx), 1);
		this.props.updateActionProperty('effects', newEffects);
	}

	addEffect(): void {
		this.props.updateActionProperty('effects', [
			...(this.props.action.effects || []),
			{ type: '3', text: '' }
		]);
	}
}
