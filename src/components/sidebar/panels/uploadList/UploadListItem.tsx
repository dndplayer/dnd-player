import React, { Component, ReactNode } from 'react';
import { Upload } from '../../../../models/Upload';
import { DragSourceMonitor, DragSource } from 'react-dnd';

import types from '../../../../constants/dragdroptypes';

interface OwnProps {
	upload: Upload;
}

interface CollectProps {
	connectDragSource: any;
}

type Props = OwnProps & CollectProps;

class UploadListItem extends Component<Props> {
	render(): ReactNode {
		const { upload } = this.props;
		const { connectDragSource } = this.props;
		return connectDragSource(<img src={upload.downloadUrl} width={64} height={64} />);
	}
}

const uploadImageSource = {
	beginDrag(props: Props) {
		return {
			imageRef: props.upload.filePath
		};
	},
	endDrag(props: Props, monitor: DragSourceMonitor, component: Component) {
		if (!monitor.didDrop()) {
			return;
		}

		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		// TODO: Fire redux action
	}
};

function collect(connect, monitor: DragSourceMonitor): CollectProps {
	return {
		connectDragSource: connect.dragSource()
	};
}

export default DragSource(types.UPLOAD_IMAGE, uploadImageSource, collect)(UploadListItem);
