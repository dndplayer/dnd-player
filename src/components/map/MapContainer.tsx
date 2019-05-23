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
	mapsToggleMeasureMode,
	mapsUpdateFogPolygon
} from '../../redux/actions/maps';
import { MapPing } from '../../models/MapPing';
import { mapPingsSendPing } from '../../redux/actions/mapPings';
import { getUserColour } from '../../redux/selectors/users';

import styles from './Map.module.scss';
import { User } from '../../models/User';
import { AppState } from '../../redux/reducers';

interface StateProps {
	maps: MapData[];
	activeMapId: string;
	selectedObjects: string[];
	playerCharacters: PlayerCharacter[];
	nonPlayerCharacters: NonPlayerCharacter[];
	images: Upload[];
	dm: boolean;
	user: firebase.User;
	users: { [key: string]: User };
	mapPings: { [key: string]: MapPing };
	measureModeEnabled: boolean;
	fogEditMode: boolean;
	fogAddMode: boolean;
	keyShiftDown: boolean;
	userColour: number;
}
interface DispatchProps {
	onUpdateObject: (mapId, mapObjectId, newData) => void;
	onAddAssetToMap: (mapId, assetType, assetId, initialData) => void;
	onAddImageToMap: (mapId, imageRef, initialData) => void;
	onSelectObject: (mapObjectId) => void;
	sendPing: (ping: MapPing) => void;
	toggleMeasureMode: (val?: boolean) => void;
	onUpdateFogPolygon: (
		mapId: string,
		fogPolygonId: string,
		position: PIXI.Point,
		points?: number[]
	) => void;
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
			users,
			sendPing,
			mapPings,
			keyShiftDown,
			toggleMeasureMode,
			measureModeEnabled,
			fogEditMode,
			fogAddMode,
			onUpdateFogPolygon,
			userColour
		} = this.props;

		const map = maps ? maps.find(x => x.id === activeMapId) : null;

		if (!map) {
			return (
				<div className={styles.noMapWrapper}>
					<div className={styles.noMapText}>No Map</div>
				</div>
			);
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
				users={users}
				userColour={userColour}
				sendPing={sendPing}
				mapPings={mapPings}
				keyShiftDown={keyShiftDown}
				toggleMeasureMode={toggleMeasureMode}
				measureModeEnabled={measureModeEnabled}
				fogEditMode={fogEditMode}
				fogAddMode={fogAddMode}
				onUpdateFogPolygon={onUpdateFogPolygon}
			/>
		);
	}
}

const mapStateToProps = (state: AppState): StateProps => ({
	selectedObjects: state.maps.selectedObjects,
	images: state.images.images,
	playerCharacters: state.assets.playerCharacters,
	nonPlayerCharacters: state.assets.nonPlayerCharacters,
	dm: state.auth.dm,
	user: state.auth.user,
	users: state.users.users,
	maps: state.maps.maps,
	activeMapId: state.globalState.state ? state.globalState.state.activeMapId : null,
	mapPings: state.mapPings.pings,
	keyShiftDown: state.keys.shiftDown,
	measureModeEnabled: state.maps.measureModeEnabled,
	fogEditMode: state.maps.fogEditMode,
	fogAddMode: state.maps.fogAddMode,
	userColour: getUserColour(state)
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
	toggleMeasureMode: (val?: boolean) => dispatch(mapsToggleMeasureMode(val)),
	onUpdateFogPolygon: (
		mapId: string,
		fogPolygonId: string,
		position: PIXI.Point,
		points?: number[]
	) => dispatch(mapsUpdateFogPolygon(mapId, fogPolygonId, position, points))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(MapContainer);
