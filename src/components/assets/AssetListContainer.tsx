import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Asset } from '../../models/Asset';
import AssetList from './AssetList';

interface StateProps {
	assets: Asset[];
}
interface DispatchProps {}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class AssetListContainer extends Component<Props> {
	render() {
		const { assets } = this.props;
		return <AssetList assets={assets} />;
	}
}

const mapStateToProps = (state): StateProps => ({
	assets: state.assets.assets
});
const mapDispatchToProps = (dispatch): DispatchProps => ({});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(AssetListContainer);
