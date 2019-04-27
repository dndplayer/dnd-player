import React, { Component } from 'react';
import AssetListItem from './AssetListItem';
import { AssetType } from '../../models/AssetType';
import { PlayerCharacterData, NonPlayerCharacterData } from '../../models/Asset';

interface Props {
	playerCharacters: PlayerCharacterData[];
	nonPlayerCharacters: NonPlayerCharacterData[];
}

export default class AssetList extends Component<Props> {
	render() {
		const { playerCharacters, nonPlayerCharacters } = this.props;
		return (
			<div>
				<ul>
					{playerCharacters.map(x => (
						<AssetListItem asset={x} assetType={AssetType.PlayerCharacter} key={x.id} />
					))}
				</ul>
				<hr />
				<ul>
					{nonPlayerCharacters.map(x => (
						<AssetListItem
							asset={x}
							assetType={AssetType.NonPlayerCharacter}
							key={x.id}
						/>
					))}
				</ul>
			</div>
		);
	}
}
