import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Asset } from '../../models/Asset';
import AssetList from './AssetList';
import {
	playerCharacterDragStart,
	playerCharacterDragEnd,
	nonPlayerCharacterDragStart,
	nonPlayerCharacterDragEnd
} from '../../redux/actions/assets';

interface StateProps {
	playerCharacters: any[];
	nonPlayerCharacters: any[];
}
interface DispatchProps {
	playerCharacterDragStart: (dragData: any) => void;
	playerCharacterDragEnd: (dragData: any) => void;
	nonPlayerCharacterDragStart: (dragData: any) => void;
	nonPlayerCharacterDragEnd: (dragData: any) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class AssetListContainer extends Component<Props> {
	render(): ReactNode {
		const {
			playerCharacters,
			nonPlayerCharacters,
			playerCharacterDragStart,
			playerCharacterDragEnd,
			nonPlayerCharacterDragStart,
			nonPlayerCharacterDragEnd
		} = this.props;
		return (
			<div>
				<h1>Asset List</h1>
				<AssetList
					playerCharacters={playerCharacters}
					nonPlayerCharacters={nonPlayerCharacters}
					playerCharacterDragStart={playerCharacterDragStart}
					playerCharacterDragEnd={playerCharacterDragEnd}
					nonPlayerCharacterDragStart={nonPlayerCharacterDragStart}
					nonPlayerCharacterDragEnd={nonPlayerCharacterDragEnd}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	playerCharacters: state.assets.playerCharacters,
	nonPlayerCharacters: state.assets.nonPlayerCharacters
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	playerCharacterDragStart: dragData => dispatch(playerCharacterDragStart(dragData)),
	playerCharacterDragEnd: dragData => dispatch(playerCharacterDragEnd(dragData)),
	nonPlayerCharacterDragStart: dragData => dispatch(nonPlayerCharacterDragStart(dragData)),
	nonPlayerCharacterDragEnd: dragData => dispatch(nonPlayerCharacterDragEnd(dragData))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(AssetListContainer);
