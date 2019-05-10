import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import AssetList from './AssetList';
import { editCharacterSheet } from '../../redux/actions/characters';
import { Upload } from '../../models/Upload';
import { PlayerCharacter, NonPlayerCharacterIndex } from '../../5e/models/Character';

interface StateProps {
	playerCharacters: PlayerCharacter[];
	nonPlayerCharactersIndex: NonPlayerCharacterIndex[];
	images: Upload[];
}
interface DispatchProps {
	editCharacterSheet: (characterId: string) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class AssetListContainer extends Component<Props> {
	render(): ReactNode {
		const {
			playerCharacters,
			nonPlayerCharactersIndex,
			editCharacterSheet,
			images
		} = this.props;
		return (
			<div>
				<h1>Asset List</h1>
				<AssetList
					playerCharacters={playerCharacters}
					nonPlayerCharactersIndex={nonPlayerCharactersIndex}
					editCharacterSheet={editCharacterSheet}
					images={images}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	playerCharacters: state.assets.playerCharacters,
	nonPlayerCharactersIndex: state.assets.nonPlayerCharactersIndex,
	images: state.images.images
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	editCharacterSheet: (characterId: string) => dispatch(editCharacterSheet(characterId))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(AssetListContainer);
