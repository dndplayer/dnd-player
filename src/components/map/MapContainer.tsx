import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Map from './Map';

import { Upload } from '../../models/Upload';
import { MapData } from '../../models/Map';
import { PlayerCharacter, NonPlayerCharacter } from '../../5e/models/Character';
import {
	mapsUpdateObject,
	mapsAddAsset,
	mapsAddImage,
	mapsSelectObject,
	mapsToggleMeasureMode
} from '../../redux/actions/maps';
import { MapPing } from '../../models/MapPing';
import { mapPingsSendPing } from '../../redux/actions/mapPings';

interface StateProps {
	maps: MapData[];
	activeMapId: string;
	selectedObjects: string[];
	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];
	images: Upload[];
	dm: boolean;
	user: firebase.User;
	mapPings: MapPing[];
	measureModeEnabled: boolean;
}
interface DispatchProps {
	onUpdateObject: (mapId, mapObjectId, newData) => void;
	onAddAssetToMap: (mapId, assetType, assetId, initialData) => void;
	onAddImageToMap: (mapId, imageRef, initialData) => void;
	onSelectObject: (mapObjectId) => void;
	sendPing: (ping: MapPing) => void;
	toggleMeasureMode: (val?: boolean) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class MapContainer extends Component<Props> {
	render(): ReactNode {
		const {
			maps,
			activeMapId,
			selectedObjects,
			onUpdateObject,
			onSelectObject,
			onAddAssetToMap,
			onAddImageToMap,
			playerCharacters,
			nonPlayerCharacters,
			images,
			dm,
			user,
			sendPing,
			mapPings,
			toggleMeasureMode,
			measureModeEnabled
		} = this.props;

		const map = maps ? maps.find(x => x.id === activeMapId) : null;

		if (!map) {
			return <div>No Map</div>;
		}

		return (
			<Map
				updateSpriteLocation={() => {}}
				mapData={map}
				selectedObjects={selectedObjects}
				playerCharacters={playerCharacters}
				nonPlayerCharacters={nonPlayerCharacters}
				onUpdateObject={onUpdateObject}
				onAddAssetToMap={onAddAssetToMap}
				onAddImageToMap={onAddImageToMap}
				onSelectObject={onSelectObject}
				images={images}
				dm={dm}
				user={user}
				sendPing={sendPing}
				mapPings={mapPings}
				toggleMeasureMode={toggleMeasureMode}
				measureModeEnabled={measureModeEnabled}
			/>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	selectedObjects: state.maps.selectedObjects,
	images: state.images.images,
	playerCharacters: state.assets.playerCharacters,
	nonPlayerCharacters: state.assets.nonPlayerCharacters,
	dm: state.auth.dm,
	user: state.auth.user,
	maps: state.maps.maps,
	activeMapId: state.globalState.state ? state.globalState.state.activeMapId : null,
	mapPings: state.mapPings.pings,
	measureModeEnabled: state.maps.measureModeEnabled
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	onUpdateObject: (mapId, mapObjectId, data) =>
		dispatch(mapsUpdateObject(mapId, mapObjectId, data)),
	onAddAssetToMap: (mapId, assetType, assetId, initialData) =>
		dispatch(mapsAddAsset(mapId, assetType, assetId, initialData)),
	onAddImageToMap: (mapId, imageRef, initialData) =>
		dispatch(mapsAddImage(mapId, imageRef, initialData)),
	onSelectObject: data => dispatch(mapsSelectObject(data)),
	sendPing: (ping: MapPing) => dispatch(mapPingsSendPing(ping)),
	toggleMeasureMode: (val?: boolean) => dispatch(mapsToggleMeasureMode(val))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(MapContainer);
