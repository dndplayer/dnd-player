import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Map from './Map';
import { testMapUpdateObject, addAssetToMap, addImageToMap } from '../../redux/actions/testMap';
import { PlayerCharacterData, NonPlayerCharacterData } from '../../models/Asset';
import { Upload } from '../../models/Upload';

interface StateProps {
	zoom: number;
	testMap: any;
	playerCharacters: PlayerCharacterData[];
	nonPlayerCharacters: NonPlayerCharacterData[];
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
	images: state.images.images,
	playerCharacters: state.assets.playerCharacters,
	nonPlayerCharacters: state.assets.nonPlayerCharacters
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	onUpdateObject: data => dispatch(testMapUpdateObject(data)),
	onAddAssetToMap: data => dispatch(addAssetToMap(data)),
	onAddImageToMap: data => dispatch(addImageToMap(data)),
	onSelectObject: data => {
		console.log('CLICK?');
	} // TODO: Tie this to a proper action + Redux
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(MapContainer);
