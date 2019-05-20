import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import InitiativeTracker from './InitiativeTracker';

import { GetDefaultTestData } from './TestData';
import { orderInitiatives } from './InitiativeHelpers';

interface StateProps {}
interface DispatchProps {}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class InitiativeTrackerContainer extends Component<Props> {
	render(): ReactNode {
		// TODO: Eventually replace this with data from Redux

		const initiatives = orderInitiatives(GetDefaultTestData());

		return <InitiativeTracker initiatives={initiatives} />;
	}
}

const mapStateToProps = (state): StateProps => ({});
const mapDispatchToProps = (dispatch): DispatchProps => ({});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(InitiativeTrackerContainer);
