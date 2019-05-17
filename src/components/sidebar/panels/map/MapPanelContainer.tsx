import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import MapPanel from './MapPanel';

interface StateProps {}
interface DispatchProps {}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class MapPanelContainer extends Component<Props> {
	render(): ReactNode {
		return <MapPanel />;
	}
}

const mapStateToProps = (state): StateProps => ({});
const mapDispatchToProps = (dispatch): DispatchProps => ({});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(MapPanelContainer);
