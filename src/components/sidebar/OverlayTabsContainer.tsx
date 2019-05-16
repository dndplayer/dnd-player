import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import OverlayTabs from './OverlayTabs';
import { Actions } from '../../redux/actions/ui';
import { OverlayPanelTypes } from '../../models/OverlayPanelTypes';
import { State } from '../../redux/reducers';

interface StateProps {
	sidebarOpen: boolean;
	sidebarPanel?: OverlayPanelTypes;
}
interface DispatchProps {
	openTab: () => void;
	closeTabs: () => void;
	openPanel: (panel: OverlayPanelTypes) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class OverlayTabsContainer extends Component<Props> {
	render(): ReactNode {
		return (
			<OverlayTabs
				open={this.props.sidebarOpen}
				openTab={this.props.openTab}
				closeTabs={this.props.closeTabs}
				openPanel={this.props.openPanel}
				currentPanel={this.props.sidebarPanel}
			/>
		);
	}
}

const mapStateToProps = (state: State): StateProps => ({
	sidebarOpen: state.ui.sidebarOpen,
	sidebarPanel: state.ui.sidebarPanel
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	openTab: () => dispatch(Actions.openSidebar()),
	closeTabs: () => dispatch(Actions.closeSidebar()),
	openPanel: (panel: OverlayPanelTypes) => dispatch(Actions.openPanel(panel))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(OverlayTabsContainer);
