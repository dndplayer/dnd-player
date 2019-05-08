import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import GeneralPanel from './GeneralPanel';

interface StateProps {}
interface DispatchProps {}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class GeneralPanelContainer extends Component<Props> {
	render(): ReactNode {
		return <GeneralPanel />;
	}
}

const mapStateToProps = (state): StateProps => ({});
const mapDispatchToProps = (dispatch): DispatchProps => ({});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(GeneralPanelContainer);
