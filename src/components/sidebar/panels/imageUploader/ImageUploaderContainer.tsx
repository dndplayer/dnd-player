import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendFile } from '../../../../redux/actions/storage';
import ImageUploader from './ImageUploader';

interface StateProps {
	uploadProgress: number;
	uploading: boolean;
}
interface DispatchProps {
	sendFile: (name: string, file: File, filePath: string) => void;
}

type Props = StateProps & DispatchProps;

class ImageUploaderContainer extends Component<Props> {
	render() {
		return (
			<ImageUploader
				onUpload={this.props.sendFile}
				progress={this.props.uploadProgress}
				inProgress={this.props.uploading}
			/>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	uploadProgress: state.storage.uploadProgress,
	uploading: state.storage.uploading
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	sendFile: (name, file, filePath) => dispatch(sendFile(name, file, filePath))
});

export default connect<StateProps, DispatchProps>(
	mapStateToProps,
	mapDispatchToProps
)(ImageUploaderContainer);
