import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateAsset from './CreateAsset';
import { Asset } from '../../models/Asset';
import { Upload } from '../../models/Upload';

interface StateProps {
	assets: Asset[];
	uploads: Upload[];
}
interface DispatchProps {}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class CreateAssetContainer extends Component<Props> {
	render() {
		return <CreateAsset uploads={this.props.uploads} />;
	}
}

const mapStateToProps = (state): StateProps => ({
	assets: state.assets.assets,
	uploads: state.images.images
});
const mapDispatchToProps = (dispatch): DispatchProps => ({});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(CreateAssetContainer);
