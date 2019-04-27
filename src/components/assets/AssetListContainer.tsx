import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import AssetList from './AssetList';
import { PlayerCharacterData, NonPlayerCharacterData } from '../../models/Asset';

interface StateProps {
	playerCharacters: PlayerCharacterData[];
	nonPlayerCharacters: NonPlayerCharacterData[];
}
interface DispatchProps {}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class AssetListContainer extends Component<Props> {
	render(): ReactNode {
		const { playerCharacters, nonPlayerCharacters } = this.props;
		return (
			<div>
				<h1>Asset List</h1>
				<AssetList
					playerCharacters={playerCharacters}
					nonPlayerCharacters={nonPlayerCharacters}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	playerCharacters: state.assets.playerCharacters,
	nonPlayerCharacters: state.assets.nonPlayerCharacters
});
const mapDispatchToProps = (dispatch): DispatchProps => ({});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(AssetListContainer);
