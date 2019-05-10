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
}

interface State {
	search: string;
}

export default class AssetList extends Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			search: ''
		};
	}

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
					value={this.state.search}
					placeholder="Search"
					onChange={e => this.setState({ search: e.target.value })}
				/>
				<ul>
					{nonPlayerCharactersIndex
						.filter(x =>
							this.state.search
								? x.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
								: true
						)
						.map(x => (
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
