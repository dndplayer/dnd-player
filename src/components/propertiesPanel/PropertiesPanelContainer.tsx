import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import PropertiesPanel from './PropertiesPanel';
import { MapData } from '../../models/Map';
import { setPropertyPanelVisibility } from '../../redux/actions/ui';
import {
	getCurrentMap,
	mapsUpdateObject,
	mapsSelectObject,
	mapsRemoveObject
} from '../../redux/actions/maps';

interface StateProps {
	visible: boolean;
	selected: string[];
	map: MapData;
	isUserDm: boolean;
}
interface DispatchProps {
	onUpdateObject: (mapId, mapObjectId, data) => void;
	removeObject: (mapId, mapObjectId) => void;
	close: () => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class PropertiesPanelContainer extends Component<Props> {
	render(): ReactNode {
		const {
			visible,
			map,
			selected,
			onUpdateObject,
			removeObject,
			close,
			isUserDm
		} = this.props;

		// This cheats currently, until we have keyboard / hotkey support to open
		// the property window, it will just show if there is anything selected.
		return (
			<PropertiesPanel
				// visible={visible}
				visible={selected && selected.length > 0}
				selected={selected}
				map={map}
				onUpdateObject={onUpdateObject}
				removeObject={removeObject}
				close={close}
				isUserDm={isUserDm}
			/>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	visible: state.ui.propertyPanel.visible,
	selected: state.maps.selectedObjects,
	map: getCurrentMap(state),
	isUserDm: state.auth.isDm
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	onUpdateObject: (mapId, mapObjectId, data) =>
		dispatch(mapsUpdateObject(mapId, mapObjectId, data)),
	removeObject: (mapId, mapObjectId) => dispatch(mapsRemoveObject(mapId, mapObjectId)),
	close: () => dispatch(mapsSelectObject({ mapObjectId: null }))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(PropertiesPanelContainer);
