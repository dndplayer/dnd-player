import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendFile } from '../../redux/actions/storage';
import ImageUploader from './ImageUploader';

interface StateProps {}
interface DispatchProps {
	sendFile: (file: File, filePath: string) => void;
}

type Props = StateProps & DispatchProps;

class ImageUploaderContainer extends Component<Props> {
	render() {
		return <ImageUploader onUpload={this.props.sendFile} />;
	}
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
	sendFile: (file, filePath) => dispatch(sendFile(file, filePath))
});

export default connect<StateProps, DispatchProps>(
	mapStateToProps,
	mapDispatchToProps
)(ImageUploaderContainer);
