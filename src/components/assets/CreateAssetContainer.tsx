import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateAsset from './CreateAsset';
import { Upload } from '../../models/Upload';
import { AssetType } from '../../models/AssetType';
import { saveNewPlayerCharacter, saveNewNonPlayerCharacter } from '../../redux/actions/assets';
// import { saveNewAsset } from '../../redux/actions/assets';

interface StateProps {
	assets: any[];
}
interface DispatchProps {
	saveNewPlayerCharacter: (data: any) => void;
	saveNewNonPlayerCharacter: (data: any) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class CreateAssetContainer extends Component<Props> {
	saveNewAsset = (assetType: AssetType, data: any): void => {
		if (assetType === AssetType.PlayerCharacter) {
			this.props.saveNewPlayerCharacter(data);
		} else if (assetType === AssetType.NonPlayerCharacter) {
			this.props.saveNewNonPlayerCharacter(data);
		}
	};

	render() {
		return <CreateAsset saveNewAsset={this.saveNewAsset} />;
	}
}

const mapStateToProps = (state): StateProps => ({
	assets: state.assets.assets
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	saveNewPlayerCharacter: data => dispatch(saveNewPlayerCharacter(data)),
	saveNewNonPlayerCharacter: data => dispatch(saveNewNonPlayerCharacter(data))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(CreateAssetContainer);
