import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import AssetList from './AssetList';
import { PlayerCharacterData, NonPlayerCharacterData } from '../../models/Asset';
import { editCharacterSheet } from '../../redux/actions/characters';
import { Upload } from '../../models/Upload';

interface StateProps {
	playerCharacters: PlayerCharacterData[];
	nonPlayerCharacters: NonPlayerCharacterData[];
	images: Upload[];
}
interface DispatchProps {
	editCharacterSheet: (characterId: string) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class AssetListContainer extends Component<Props> {
	render(): ReactNode {
		const { playerCharacters, nonPlayerCharacters, editCharacterSheet, images } = this.props;
		return (
			<div>
				<h1>Asset List</h1>
				<AssetList
					playerCharacters={playerCharacters}
					nonPlayerCharacters={nonPlayerCharacters}
					editCharacterSheet={editCharacterSheet}
					images={images}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	playerCharacters: state.assets.playerCharacters,
	nonPlayerCharacters: state.assets.nonPlayerCharacters,
	images: state.images.images
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	editCharacterSheet: (characterId: string) => dispatch(editCharacterSheet(characterId))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(AssetListContainer);
