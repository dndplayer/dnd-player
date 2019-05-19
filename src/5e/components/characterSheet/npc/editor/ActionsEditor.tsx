import React, { ReactNode } from 'react';

import css from './NonPlayerCharacterSheetEditor.module.css';
import { NonPlayerCharacter } from '../../../../models/Character';
import ActionEditor from './ActionEditor';
import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';

interface Props {
	character: NonPlayerCharacter;
	actionProperty: string;
	updateCharacterProperty: (property: string, value: any) => void;
}

export default class ActionsEditor extends React.Component<Props, {}> {
	render(): ReactNode {
		const { character, actionProperty } = this.props;

		const actions = [];
		for (const actionIdx in character[actionProperty] || []) {
			const idx = actionIdx;
			const action = character[actionProperty][idx];
			actions.push(
				<ActionEditor
					key={idx}
					action={action}
					updateActionProperty={(p, v): void => this.updateActionProperty(idx, p, v)}
					removeAction={(): void => this.removeAction(idx)}
				/>
			);
		}

		return (
			<div className="column">
				<div className={`${css.column} ${css.center}`}>
					{actions}
					<div className={css.button} onClick={(): void => this.addAction()}>
						<Icon path={mdiPlus} size={1} color={'#ccc'} />
					</div>
				</div>
			</div>
		);
	}

	updateActionProperty(actionIdx: string, property: string, value: any): void {
		const newActions = [...this.props.character[this.props.actionProperty]];
		newActions[actionIdx][property] = value;
		this.props.updateCharacterProperty(this.props.actionProperty, newActions);
	}

	removeAction(actionIdx: string): void {
		const newActions = [...this.props.character[this.props.actionProperty]];
		newActions.splice(parseInt(actionIdx), 1);
		this.props.updateCharacterProperty(this.props.actionProperty, newActions);
	}

	addAction(): void {
		this.props.updateCharacterProperty(this.props.actionProperty, [
			...(this.props.character[this.props.actionProperty] || []),
			{ title: '', description: '' }
		]);
	}
}
