import React, { Component } from 'react';
import AssetListItem from './AssetListItem';
import { AssetType } from '../../models/AssetType';
import { Upload } from '../../models/Upload';
import { PlayerCharacter, NonPlayerCharacterIndex } from '../../5e/models/Character';

interface Props {
	playerCharacters: PlayerCharacter[];
	nonPlayerCharactersIndex: NonPlayerCharacterIndex[];
	editCharacterSheet: (characterId: string) => void;
	images: Upload[];
	nonPlayerCharacterFilter: string;
	changeNonPlayerCharacterFilterText: (text: string) => void;
}

export default class AssetList extends Component<Props> {
	render() {
		const { playerCharacters, nonPlayerCharactersIndex } = this.props;
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
				<input
					type="text"
					value={this.props.nonPlayerCharacterFilter}
					placeholder="Search"
					onChange={e => this.props.changeNonPlayerCharacterFilterText(e.target.value)}
				/>
				<div>
					{nonPlayerCharactersIndex.map(x => (
						<AssetListItem
							asset={x}
							assetType={AssetType.NonPlayerCharacter}
							key={x.id}
							{...this.props}
						/>
					))}
				</div>
			</div>
		);
	}
}
