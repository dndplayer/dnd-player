import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.css';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import { PlayerCharacter } from '../../../../models/Character';

interface Props<T> {
	updateCharacterProperty: (property: string, value: any) => void;
	character: PlayerCharacter;
}

export default abstract class ArrayEditor<T> extends React.Component<Props<T>, {}> {
	abstract mapItem(idx: string, item: T): ReactNode;
	abstract prop: string;
	abstract heading: string;

	render(): ReactNode {
		const { character } = this.props;
		const prop = this.prop;
		const heading = this.heading;

		const items = [];
		for (const itemIdx in character[prop] || []) {
			const idx = itemIdx;
			const item = character[prop][idx];
			items.push(this.mapItem(idx, item));
		}

		return (
			<div className="row">
				<span className={css.boldHeading}>{heading}</span>
				<div className={`${css.column} ${css.center}`}>
					{items}
					<div className={css.button} onClick={() => this.addItem()}>
						<Icon path={mdiPlus} size={1} color={'#ccc'} />
					</div>
				</div>
			</div>
		);
	}

	updateItemProperty(itemIdx: string, property: string, value: any): void {
		const newItems = [...this.props.character[this.prop]];
		newItems[itemIdx][property] = value;
		this.props.updateCharacterProperty(this.prop, newItems);
	}

	removeItem(itemIdx: string): void {
		const newItems = [...this.props.character[this.prop]];
		newItems.splice(parseInt(itemIdx), 1);
		this.props.updateCharacterProperty(this.prop, newItems);
	}

	addItem(): void {
		this.props.updateCharacterProperty(this.prop, [
			...(this.props.character[this.prop] || []),
			{}
		]);
	}
}
