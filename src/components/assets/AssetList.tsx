import React, { Component } from 'react';
import { Asset } from '../../models/Asset';
import AssetListItem from './AssetListItem';
import { AssetType } from '../../models/AssetType';

interface Props {
	playerCharacters: any[];
	nonPlayerCharacters: any[];
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
