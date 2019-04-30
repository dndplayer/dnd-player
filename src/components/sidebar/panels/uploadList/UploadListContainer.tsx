import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import UploadList from './UploadList';
import { Upload } from '../../../../models/Upload';

interface StateProps {
	uploads: Upload[];
}
interface DispatchProps {}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class UploadListContainer extends Component<Props> {
	render(): ReactNode {
		const { uploads } = this.props;
		return <UploadList uploads={uploads} />;
	}
}

const mapStateToProps = (state): StateProps => ({
	uploads: state.images.images
});
const mapDispatchToProps = (dispatch): DispatchProps => ({});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(UploadListContainer);
