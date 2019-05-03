import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import PropertiesPanel from './PropertiesPanel';
import { MapData } from '../../models/Map';

interface StateProps {
	visible: boolean;
	selected: string[];
	map: MapData;
}
interface DispatchProps {}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class PropertiesPanelContainer extends Component<Props> {
	render(): ReactNode {
		const { visible, map, selected } = this.props;

		// TODO: Find the selected object in the map (if there is one)

		return <PropertiesPanel visible={visible} selected={selected} map={map} />;
	}
}

const mapStateToProps = (state): StateProps => ({
	visible: state.ui.propertyPanel.visible,
	selected: state.testMap.selectedObjects,
	map: state.testMap.map
});
const mapDispatchToProps = (dispatch): DispatchProps => ({});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(PropertiesPanelContainer);
