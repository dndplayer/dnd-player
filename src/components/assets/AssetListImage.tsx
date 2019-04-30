import React, { Component, ReactNode } from 'react';
import { DragSource } from 'react-dnd';
import types from '../../constants/dragdroptypes';
import { AssetType } from '../../models/AssetType';
import { withStyles } from '@material-ui/core';

import css from './AssetListItem.module.css';
import { Upload } from '../../models/Upload';

const styles = (theme): any => ({
	assetItem: {
		backgroundColor: 'transparent',
		'&:hover': {
			backgroundColor: 'green'
		}
	},
	dragging: {
		backgroundColor: 'red'
	}
});

interface OwnProps {
	asset: any;
	assetType: AssetType;
	images: Upload[];
}

interface CollectProps {
	connectDragSource: any;
	isDragging: boolean;
}

type Props = OwnProps & CollectProps;

class AssetListImage extends Component<Props> {
	render(): ReactNode {
		const { asset, assetType, images } = this.props;
		// These two props are injected by React DnD,
		// as defined by your `collect` function below:
		const { isDragging, connectDragSource } = this.props;
		const s = {
			cursor: 'grab',
			padding: '5px 10px'
		};
		if (isDragging) {
			s['backgroundColor'] = 'red';
		}

		const image = images.find(x => x.filePath === asset.imageRef);

		return connectDragSource(
			<img
				style={s}
				className={css.image}
				src={image ? image.downloadUrl : asset.imageUrl || ''}
				alt={asset.name || 'unknown'}
			/>
		);
	}
}

const pcAssetSource = {
	beginDrag(props) {
		return {
			id: props.asset.id,
			assetType: props.assetType
		};
	},
	endDrag(props, monitor, component) {
		if (!monitor.didDrop()) {
			return;
		}

		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		// TODO: Fire redux action
	}
};

function collect(connect, monitor): CollectProps {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}

export default DragSource(types.PLAYER_CHARACTER_ASSET, pcAssetSource, collect)(
	withStyles(styles)(AssetListImage)
);
