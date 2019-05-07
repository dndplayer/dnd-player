import React, { Component } from 'react';
import AssetListItem from './AssetListItem';
import { AssetType } from '../../models/AssetType';
import { Upload } from '../../models/Upload';
import { PlayerCharacter, NonPlayerCharacter } from '../../5e/models/Character';

interface Props {
	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];
	editCharacterSheet: (characterId: string) => void;
	images: Upload[];
}

export default class AssetList extends Component<Props> {
	render() {
		const { playerCharacters, nonPlayerCharacters } = this.props;
		return (
			<div>
				<ul>
					{playerCharacters.map(x => (
						<AssetListItem
							asset={x}
							assetType={AssetType.PlayerCharacter}
							key={x.id}
							{...this.props}
						/>
					))}
				</ul>
				<hr />
				<ul>
					{nonPlayerCharacters.map(x => (
						<AssetListItem
							asset={x}
							assetType={AssetType.NonPlayerCharacter}
							key={x.id}
							{...this.props}
						/>
					))}
				</ul>
			</div>
		);
	}
}
