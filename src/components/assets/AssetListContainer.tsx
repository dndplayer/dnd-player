import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import AssetList from './AssetList';
import { editCharacterSheet } from '../../redux/actions/characters';
import { Upload } from '../../models/Upload';
import { PlayerCharacter, NonPlayerCharacterIndex } from '../../5e/models/Character';
import { changeNonPlayerCharacterFilterText, openCharacterSheet } from '../../redux/actions/assets';
import { getFilteredNpcs } from '../../redux/selectors/assets';

interface StateProps {
	playerCharacters: PlayerCharacter[];
	nonPlayerCharactersIndex: NonPlayerCharacterIndex[];
	images: Upload[];
	nonPlayerCharacterFilter: string;
}
interface DispatchProps {
	changeNonPlayerCharacterFilterText: (text: string) => void;
	openCharacterSheet: (characterId: string) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class AssetListContainer extends Component<Props> {
	render(): ReactNode {
		const {
			playerCharacters,
			nonPlayerCharactersIndex,
			openCharacterSheet,
			images,
			changeNonPlayerCharacterFilterText,
			nonPlayerCharacterFilter
		} = this.props;
		return (
			<div>
				<h1>Asset List</h1>
				<AssetList
					playerCharacters={playerCharacters}
					nonPlayerCharactersIndex={nonPlayerCharactersIndex}
					openCharacterSheet={openCharacterSheet}
					changeNonPlayerCharacterFilterText={changeNonPlayerCharacterFilterText}
					nonPlayerCharacterFilter={nonPlayerCharacterFilter}
					images={images}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	playerCharacters: state.assets.playerCharacters,
	nonPlayerCharactersIndex: getFilteredNpcs(state),
	images: state.images.images,
	nonPlayerCharacterFilter: state.assets.nonPlayerCharacterFilter
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	changeNonPlayerCharacterFilterText: (text: string) =>
		dispatch(changeNonPlayerCharacterFilterText(text)),
	openCharacterSheet: (characterId: string) => dispatch(openCharacterSheet(characterId))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(AssetListContainer);
