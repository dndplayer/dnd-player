import React, { Component } from 'react';
import { Asset } from '../../models/Asset';
import AssetListItem from './AssetListItem';

interface Props {
	// assets: Asset[];
	assets: any[];
}

export default class AssetList extends Component<Props> {
	render() {
		const { assets } = this.props;
		return (
			<div>
				<ul>
					{assets.map(x => (
						<AssetListItem asset={x} key={x.id} />
					))}
				</ul>
			</div>
		);
	}
}
