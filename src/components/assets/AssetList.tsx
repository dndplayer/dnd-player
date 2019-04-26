import React, { Component } from 'react';
import { Asset } from '../../models/Asset';
import AssetListItem from './AssetListItem';

interface Props {
	playerCharacters: any[];
	nonPlayerCharacters: any[];
	playerCharacterDragStart: (dragData: any) => void;
	playerCharacterDragEnd: (dragData: any) => void;
	nonPlayerCharacterDragStart: (dragData: any) => void;
	nonPlayerCharacterDragEnd: (dragData: any) => void;
}

export default class AssetList extends Component<Props> {
	render() {
		const {
			playerCharacters,
			nonPlayerCharacters,
			playerCharacterDragStart,
			playerCharacterDragEnd,
			nonPlayerCharacterDragStart,
			nonPlayerCharacterDragEnd
		} = this.props;
		return (
			<div>
				<ul>
					{playerCharacters.map(x => (
						<AssetListItem
							asset={x}
							key={x.id}
							onDragStart={playerCharacterDragStart}
							onDragEnd={playerCharacterDragEnd}
						/>
					))}
				</ul>
				<hr />
				<ul>
					{nonPlayerCharacters.map(x => (
						<AssetListItem
							asset={x}
							key={x.id}
							onDragStart={nonPlayerCharacterDragStart}
							onDragEnd={nonPlayerCharacterDragEnd}
						/>
					))}
				</ul>
			</div>
		);
	}
}
