import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import PropertiesPanel from './PropertiesPanel';
import { MapData } from '../../models/Map';
import { mapsUpdateObject, mapsSelectObject, mapsRemoveObject } from '../../redux/actions/maps';
import { getCurrentMap } from '../../redux/selectors/maps';
import { State } from '../../redux/reducers';

interface StateProps {
	selected: string[];
	map: MapData;
	dm: boolean;
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
		const { map, selected, onUpdateObject, removeObject, close, dm } = this.props;

		return (
			<PropertiesPanel
				visible={selected && selected.length > 0}
				selected={selected}
				map={map}
				onUpdateObject={onUpdateObject}
				removeObject={removeObject}
				close={close}
				dm={dm}
			/>
		);
	}
}

const mapStateToProps = (state: State): StateProps => ({
	selected: state.maps.selectedObjects,
	map: getCurrentMap(state),
	dm: state.auth.dm
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
