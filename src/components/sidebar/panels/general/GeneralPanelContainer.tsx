import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import GeneralPanel from './GeneralPanel';
import { updateBackgroundColour } from '../../../../redux/actions/testMap';

interface StateProps {
	backgroundColour?: string;
}
interface DispatchProps {
	updateStageBackground: (colour: string) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class GeneralPanelContainer extends Component<Props> {
	render(): ReactNode {
		const { backgroundColour, updateStageBackground } = this.props;

		return (
			<GeneralPanel
				stageBackground={backgroundColour}
				updateStageBackground={updateStageBackground}
			/>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	backgroundColour: state.testMap && state.testMap.map ? state.testMap.map.backgroundColour : null
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	updateStageBackground: (colour: string) => dispatch(updateBackgroundColour(colour))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(GeneralPanelContainer);
