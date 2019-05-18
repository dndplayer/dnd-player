import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import MapPanel from './MapPanel';
import {
	enableFogEditMode,
	disableFogEditMode,
	mapsUpdateFogColour,
	mapsUpdateBackgroundColour,
	enableFogAddMode,
	disableFogAddMode
} from '../../../../redux/actions/maps';
import { MapData } from '../../../../models/Map';
import { getCurrentMap } from '../../../../redux/selectors/maps';

interface StateProps {
	fogEditMode: boolean;
	fogAddMode: boolean;
	activeMapId: string;
	activeMap: MapData;
}
interface DispatchProps {
	enableFogEditMode: () => void;
	disableFogEditMode: () => void;
	enableFogAddMode: () => void;
	disableFogAddMode: () => void;
	updateFogColour: (mapId: string, colour: string) => void;
	updateStageBackground: (mapId: string, colour: string) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class MapPanelContainer extends Component<Props> {
	render(): ReactNode {
		const {
			enableFogEditMode,
			disableFogEditMode,
			enableFogAddMode,
			disableFogAddMode,
			fogEditMode,
			fogAddMode,
			updateFogColour,
			updateStageBackground,
			activeMapId,
			activeMap
		} = this.props;

		return (
			<MapPanel
				activeMapId={activeMapId}
				activeMap={activeMap}
				fogEditMode={fogEditMode}
				fogAddMode={fogAddMode}
				enableFogEditMode={enableFogEditMode}
				disableFogEditMode={disableFogEditMode}
				enableFogAddMode={enableFogAddMode}
				disableFogAddMode={disableFogAddMode}
				updateFogColour={updateFogColour}
				updateStageBackground={updateStageBackground}
			/>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	fogAddMode: state.maps.fogAddMode,
	fogEditMode: state.maps.fogEditMode,
	activeMapId: state.globalState.state.activeMapId,
	activeMap: getCurrentMap(state)
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	enableFogEditMode: () => dispatch(enableFogEditMode()),
	disableFogEditMode: () => dispatch(disableFogEditMode()),
	enableFogAddMode: () => dispatch(enableFogAddMode()),
	disableFogAddMode: () => dispatch(disableFogAddMode()),
	updateFogColour: (mapId: string, colour: string) =>
		dispatch(mapsUpdateFogColour(mapId, colour)),
	updateStageBackground: (mapId: string, colour: string) =>
		dispatch(mapsUpdateBackgroundColour(mapId, colour))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(MapPanelContainer);
