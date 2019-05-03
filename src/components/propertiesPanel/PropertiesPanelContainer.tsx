import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import PropertiesPanel from './PropertiesPanel';
import { MapData } from '../../models/Map';
import { testMapUpdateObject } from '../../redux/actions/testMap';

interface StateProps {
	visible: boolean;
	selected: string[];
	map: MapData;
}
interface DispatchProps {
	onUpdateObject: (data) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class PropertiesPanelContainer extends Component<Props> {
	render(): ReactNode {
		const { visible, map, selected, onUpdateObject } = this.props;

		// This cheats currently, until we have keyboard / hotkey support to open
		// the property window, it will just show if there is anything selected.
		return (
			<PropertiesPanel
				// visible={visible}
				visible={selected && selected.length > 0}
				selected={selected}
				map={map}
				onUpdateObject={onUpdateObject}
			/>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	visible: state.ui.propertyPanel.visible,
	selected: state.testMap.selectedObjects,
	map: state.testMap.map
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	onUpdateObject: data => dispatch(testMapUpdateObject(data))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(PropertiesPanelContainer);
