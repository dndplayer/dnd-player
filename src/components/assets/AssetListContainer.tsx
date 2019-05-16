import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import AssetList from './AssetList';
import { Upload } from '../../models/Upload';
import { PlayerCharacter, NonPlayerCharacter } from '../../5e/models/Character';
import { Actions } from '../../redux/actions/assets';
import { getFilteredNpcs } from '../../redux/selectors/assets';
import { State } from '../../redux/reducers';

interface StateProps {
	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];
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
			nonPlayerCharacters,
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
					nonPlayerCharacters={nonPlayerCharacters}
					openCharacterSheet={openCharacterSheet}
					changeNonPlayerCharacterFilterText={changeNonPlayerCharacterFilterText}
					nonPlayerCharacterFilter={nonPlayerCharacterFilter}
					images={images}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state: State): StateProps => ({
	playerCharacters: state.assets.playerCharacters,
	nonPlayerCharacters: getFilteredNpcs(state),
	images: state.images.images,
	nonPlayerCharacterFilter: state.assets.nonPlayerCharacterFilter
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	changeNonPlayerCharacterFilterText: (text: string) =>
		dispatch(Actions.changeNonPlayerCharacterFilterText(text)),
	openCharacterSheet: (characterId: string) => dispatch(Actions.openCharacterSheet(characterId))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(AssetListContainer);
