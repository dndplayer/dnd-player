import React, { Component, ReactNode, CSSProperties } from 'react';
import { connect } from 'react-redux';
import ViewControls from './ViewControls';
import { zoomIn, zoomOut } from '../../redux/actions/map';

interface StateProps {}
interface DispatchProps {
	mapZoomIn: () => void;
	mapZoomOut: () => void;
}
interface OwnProps {
	style?: CSSProperties;
}

type Props = StateProps & DispatchProps & OwnProps;

class ViewControlsContainer extends Component<Props> {
	render(): ReactNode {
		const { mapZoomIn, mapZoomOut } = this.props;
		return (
			<div style={this.props.style}>
				<ViewControls mapZoomIn={mapZoomIn} mapZoomOut={mapZoomOut} />
			</div>
		);
	}
}

const mapStateToProps = (state): StateProps => ({});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	mapZoomIn: () => dispatch(zoomIn()),
	mapZoomOut: () => dispatch(zoomOut())
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(ViewControlsContainer);
