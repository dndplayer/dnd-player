import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateAsset from './CreateAsset';
import { Asset } from '../../models/Asset';
import { Upload } from '../../models/Upload';
import { saveNewAsset } from '../../redux/actions/assets';

interface StateProps {
	assets: Asset[];
	uploads: Upload[];
}
interface DispatchProps {
	saveNewAsset: (asset: Asset) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class CreateAssetContainer extends Component<Props> {
	render() {
		return <CreateAsset uploads={this.props.uploads} saveNewAsset={this.props.saveNewAsset} />;
	}
}

const mapStateToProps = (state): StateProps => ({
	assets: state.assets.assets,
	uploads: state.images.images
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	saveNewAsset: (asset: Asset) => dispatch(saveNewAsset(asset))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(CreateAssetContainer);
