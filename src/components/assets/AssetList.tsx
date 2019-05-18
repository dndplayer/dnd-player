import React, { Component, ReactNode } from 'react';
import AssetListItem from './AssetListItem';
import { AssetType } from '../../models/AssetType';
import { Upload } from '../../models/Upload';
import { PlayerCharacter, NonPlayerCharacter } from '../../5e/models/Character';

interface Props {
	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];
	openCharacterSheet: (characterId: string) => void;
	images: Upload[];
	nonPlayerCharacterFilter: string;
	changeNonPlayerCharacterFilterText: (text: string) => void;
	dm: boolean;
}

export default class AssetList extends Component<Props> {
	render(): ReactNode {
		const { playerCharacters, nonPlayerCharacters, dm } = this.props;
		return (
			<div>
				<ul>
					{playerCharacters.map(
						(x): ReactNode => (
							<AssetListItem
								asset={x}
								assetType={AssetType.PlayerCharacter}
								key={x.id}
								{...this.props}
							/>
						)
					)}
				</ul>
				<hr />
				{dm && (
					<div>
						<input
							type="text"
							value={this.props.nonPlayerCharacterFilter}
							placeholder="Search"
							onChange={(e): void =>
								this.props.changeNonPlayerCharacterFilterText(e.target.value)
							}
						/>
						{nonPlayerCharacters.map(
							(x): ReactNode => (
								<AssetListItem
									asset={x}
									assetType={AssetType.NonPlayerCharacter}
									key={x.id}
									{...this.props}
								/>
							)
						)}
					</div>
				)}
			</div>
		);
	}
}
