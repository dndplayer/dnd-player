import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import types from '../../constants/dragdroptypes';
import { AssetType } from '../../models/AssetType';

interface OwnProps {
	asset: any;
	assetType: AssetType;
}

interface CollectProps {
	connectDragSource: any;
	isDragging: boolean;
}

type Props = OwnProps & CollectProps;

class AssetListItem extends Component<Props> {
	render() {
		const { asset, assetType } = this.props;
		// These two props are injected by React DnD,
		// as defined by your `collect` function below:
		const { isDragging, connectDragSource } = this.props;
		return connectDragSource(
			<div
				style={{
					cursor: 'pointer',
					padding: '5px 10px',
					backgroundColor: isDragging ? 'red' : 'transparent'
				}}
			>
				{asset.name || 'unknown'}
			</div>
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

export default DragSource(types.PLAYER_CHARACTER_ASSET, pcAssetSource, collect)(AssetListItem);
