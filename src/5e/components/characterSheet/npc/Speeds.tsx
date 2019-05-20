import React, { ReactNode } from 'react';

import css from './NonPlayerCharacterSheet.module.scss';
import { NonPlayerCharacter } from '../../../models/Character';
import Rules from '../../../5eRules';

interface Props {
	character: NonPlayerCharacter;
}

export default class Speeds extends React.Component<Props, {}> {
	getFormat(character: NonPlayerCharacter, type: string): string {
		if (character.speed && character.speed[type]) {
			return `${character.speed[type]} ft. ${Rules.getSpeedName(type)}`;
		}

		return '';
	}
	render(): ReactNode {
		const { character } = this.props;

		const str = [
			this.getFormat(character, 'walk'),
			this.getFormat(character, 'fly'),
			this.getFormat(character, 'climb'),
			this.getFormat(character, 'swim'),
			this.getFormat(character, 'burrow')
		]
			.filter(x => x)
			.join(', ');

		return (
			<div className={css.row}>
				<span className={css.boldHeading}>Speed</span>
				<span>{str}</span>
			</div>
		);
	}
}
