import React, { Component, ReactNode } from 'react';
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
	render(): ReactNode {
		const { assets } = this.props;
		return (
			<div>
				<h1>Asset List</h1>
				<AssetList assets={assets} />
			</div>
		);
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
