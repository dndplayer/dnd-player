import React, { Component } from 'react';

interface Props {
	asset: any;
	onDragStart: (data: any) => void;
	onDragEnd: (data: any) => void;
}
export default class AssetListItem extends Component<Props> {
	render() {
		const { asset, onDragStart, onDragEnd } = this.props;
		return (
			<div
				draggable={true}
				onDragStart={evt => onDragStart({ x: evt.clientX, y: evt.clientY })}
				onDragEnd={evt => onDragEnd({ x: evt.clientX, y: evt.clientY })}
				style={{ cursor: 'pointer', padding: '5px 10px' }}
			>
				{asset.name || 'unknown'}
			</div>
		);
	}
}
