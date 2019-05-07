import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Map from './Map';
import {
	testMapUpdateObject,
	addAssetToMap,
	addImageToMap,
	selectObject
} from '../../redux/actions/testMap';
import { Upload } from '../../models/Upload';
import { MapData } from '../../models/Map';
import { PlayerCharacter, NonPlayerCharacter } from '../../5e/models/Character';

interface StateProps {
	zoom: number;
	testMap: MapData;
	selectedObjects: string[];
	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];
	images: Upload[];
}
interface DispatchProps {
	onUpdateObject: (data) => void;
	onAddAssetToMap: (data) => void;
	onAddImageToMap: (data) => void;
	onSelectObject: (data) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class MapContainer extends Component<Props> {
	render(): ReactNode {
		const {
			zoom,
			testMap,
			selectedObjects,
			onUpdateObject,
			onSelectObject,
			onAddAssetToMap,
			onAddImageToMap,
			playerCharacters,
			nonPlayerCharacters,
			images
		} = this.props;
		return (
			<Map
				updateSpriteLocation={() => {}}
				zoom={zoom}
				mapData={testMap}
				selectedObjects={selectedObjects}
				// testMap={testMap}
				playerCharacters={playerCharacters}
				nonPlayerCharacters={nonPlayerCharacters}
				onUpdateObject={onUpdateObject}
				onAddAssetToMap={onAddAssetToMap}
				onAddImageToMap={onAddImageToMap}
				onSelectObject={onSelectObject}
				images={images}
			/>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	zoom: state.map.zoom,
	testMap: state.testMap.map,
	selectedObjects: state.testMap.selectedObjects,
	images: state.images.images,
	playerCharacters: state.assets.playerCharacters,
	nonPlayerCharacters: state.assets.nonPlayerCharacters
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	onUpdateObject: data => dispatch(testMapUpdateObject(data)),
	onAddAssetToMap: data => dispatch(addAssetToMap(data)),
	onAddImageToMap: data => dispatch(addImageToMap(data)),
	onSelectObject: data => dispatch(selectObject(data))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(MapContainer);
