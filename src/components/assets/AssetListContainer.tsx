import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import AssetList from './AssetList';
import { PlayerCharacterData, NonPlayerCharacterData } from '../../models/Asset';
import { openCharacterSheet } from '../../redux/actions/characters';
import { Upload } from '../../models/Upload';

interface StateProps {
	playerCharacters: PlayerCharacterData[];
	nonPlayerCharacters: NonPlayerCharacterData[];
	images: Upload[];
}
interface DispatchProps {
	openCharacterSheet: (characterId: string) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class AssetListContainer extends Component<Props> {
	render(): ReactNode {
		const { playerCharacters, nonPlayerCharacters, openCharacterSheet, images } = this.props;
		return (
			<div>
				<h1>Asset List</h1>
				<AssetList
					playerCharacters={playerCharacters}
					nonPlayerCharacters={nonPlayerCharacters}
					openCharacterSheet={openCharacterSheet}
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
	openCharacterSheet: (characterId: string) => dispatch(openCharacterSheet(characterId))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(AssetListContainer);
