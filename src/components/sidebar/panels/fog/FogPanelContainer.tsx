import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import FogPanel from './FogPanel';

interface StateProps {}
interface DispatchProps {}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class FogPanelContainer extends Component<Props> {
	render(): ReactNode {
		return <FogPanel />;
	}
}

const mapStateToProps = (state): StateProps => ({});
const mapDispatchToProps = (dispatch): DispatchProps => ({});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(FogPanelContainer);
