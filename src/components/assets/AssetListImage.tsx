import React, { Component, ReactNode } from 'react';
import { AssetType } from '../../models/AssetType';

import css from './AssetListItem.module.css';
import { Upload } from '../../models/Upload';

interface Props {
	asset: any;
	assetType: AssetType;
	images: Upload[];
}

export default class AssetListImage extends Component<Props> {
	render(): ReactNode {
		const { asset, assetType, images } = this.props;

		const image = images.find(x => x.filePath === asset.imageRef);

		return (
			<img
				className={css.image}
				src={image ? image.downloadUrl : asset.imageUrl || asset.imageRef}
				alt={asset.name || 'unknown'}
			/>
		);
	}
}
