import React, { Component, ReactNode } from 'react';
import { AssetType } from '../../models/AssetType';
import types from '../../constants/dragdroptypes';

import css from './AssetListItem.module.css';
import AssetListImage from './AssetListImage';
import { Upload } from '../../models/Upload';
import { DragSource } from 'react-dnd';
import { withStyles } from '@material-ui/core';

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
	editCharacterSheet: (characterId: string) => void;
	connectDragSource: any;
}

interface CollectProps {
	connectDragSource: any;
	isDragging: boolean;
}

type Props = OwnProps & CollectProps;

export class AssetListItem extends Component<Props, {}> {
	render(): ReactNode {
		const { asset, assetType, isDragging, connectDragSource } = this.props;
		const s = {
			cursor: 'grab',
			padding: '5px 10px'
		};
		if (isDragging) {
			s['backgroundColor'] = 'red';
		}
		return connectDragSource(
			<div className={css.item} style={s}>
				{assetType === AssetType.PlayerCharacter && <AssetListImage {...this.props} />}
				<div className={css.title} onClick={() => this.onClick(asset)}>
					{asset.name || 'unknown'}
				</div>
			</div>
		);
	}

	onClick(asset): void {
		window.open(
			`/#/characterSheet/${asset.id}`,
			'popupWindow',
			'height=1000,width=800,toolbar=no,location=no,statusbar=no,titlebar=no,directories=no',
			false
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
