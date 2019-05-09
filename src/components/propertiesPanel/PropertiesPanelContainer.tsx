import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import PropertiesPanel from './PropertiesPanel';
import { MapData } from '../../models/Map';
import {
	testMapUpdateObject,
	selectObject,
	testMapRemoveObject
} from '../../redux/actions/testMap';
import { setPropertyPanelVisibility } from '../../redux/actions/ui';

interface StateProps {
	visible: boolean;
	selected: string[];
	map: MapData;
	isUserDm: boolean;
}
interface DispatchProps {
	onUpdateObject: (data) => void;
	removeObject: (mapObjectId) => void;
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
	selected: state.testMap.selectedObjects,
	map: state.testMap.map,
	isUserDm: state.auth.isDm
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	onUpdateObject: data => dispatch(testMapUpdateObject(data)),
	removeObject: mapObjectId => dispatch(testMapRemoveObject(mapObjectId)),
	close: () => dispatch(selectObject({ mapObjectId: null }))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(PropertiesPanelContainer);
