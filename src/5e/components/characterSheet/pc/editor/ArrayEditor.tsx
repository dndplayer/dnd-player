import React, { ReactNode } from 'react';

import css from './PlayerCharacterSheetEditor.module.scss';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import { PlayerCharacter } from '../../../../models/Character';

interface Props<T, LookupType> {
	updateCharacterProperty: (property: string, value: any) => void;
	character: PlayerCharacter;
	lookup?: LookupType[];
}

export default abstract class ArrayEditor<T, LookupType = {}> extends React.Component<
	Props<T, LookupType>,
	{}
> {
	abstract mapItem(idx: string, item: T): ReactNode;
	abstract prop: string;
	abstract heading: string;
	abstract direction: 'row' | 'column' | 'columnCenter';

	render(): ReactNode {
		const { character } = this.props;
		const prop = this.prop;
		const heading = this.heading;
		const direction = this.direction;

		const items = [];
		for (const itemIdx in character[prop] || []) {
			const idx = itemIdx;
			const item = character[prop][idx];
			items.push(this.mapItem(idx, item));
		}

		return (
			<div className={css[direction || 'columnCenter']}>
				<span className={css.label}>{heading}</span>
				<div className={css[direction || 'row']}>
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
