import React, { Component, ReactNode } from 'react';
import { Upload } from '../../../../models/Upload';
import UploadListItem from './UploadListItem';

interface Props {
	uploads: Upload[];
}

export default class UploadList extends Component<Props> {
	render(): ReactNode {
		return this.props.uploads.map(x => <UploadListItem key={x.id} upload={x} />);
	}
}
