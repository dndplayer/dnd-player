import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import types from '../../constants/dragdroptypes';
import { AssetType } from '../../models/AssetType';
import { withStyles, WithStyles } from '@material-ui/core';

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

interface OwnProps extends WithStyles<typeof styles> {
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
		const { classes, asset, assetType } = this.props;
		// These two props are injected by React DnD,
		// as defined by your `collect` function below:
		const { isDragging, connectDragSource } = this.props;
		const s = {
			cursor: 'pointer',
			padding: '5px 10px'
		};
		if (isDragging) {
			s['backgroundColor'] = 'red';
		}
		return connectDragSource(
			<div className={classes.assetItem} style={s}>
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

export default DragSource(types.PLAYER_CHARACTER_ASSET, pcAssetSource, collect)(
	withStyles(styles)(AssetListItem)
);
