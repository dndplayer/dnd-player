import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Map from './Map';
import { testMapUpdateObject, addAssetToMap } from '../../redux/actions/testMap';
import { PlayerCharacterData, NonPlayerCharacterData } from '../../models/Asset';

interface StateProps {
	zoom: number;
	testMap: any;
	playerCharacters: PlayerCharacterData[];
	nonPlayerCharacters: NonPlayerCharacterData[];
}
interface DispatchProps {
	onUpdateObject: (data) => void;
	onAddAssetToMap: (data) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class MapContainer extends Component<Props> {
	render(): ReactNode {
		const {
			zoom,
			testMap,
			onUpdateObject,
			onAddAssetToMap,
			playerCharacters,
			nonPlayerCharacters
		} = this.props;
		return (
			<Map
				updateSpriteLocation={() => {}}
				zoom={zoom}
				testMap={testMap}
				playerCharacters={playerCharacters}
				nonPlayerCharacters={nonPlayerCharacters}
				onUpdateObject={onUpdateObject}
				onAddAssetToMap={onAddAssetToMap}
			/>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	zoom: state.map.zoom,
	testMap: state.testMap.map,
	playerCharacters: state.assets.playerCharacters,
	nonPlayerCharacters: state.assets.nonPlayerCharacters
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	onUpdateObject: data => dispatch(testMapUpdateObject(data)),
	onAddAssetToMap: data => dispatch(addAssetToMap(data))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(MapContainer);
