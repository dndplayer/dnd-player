import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import GeneralPanel from './GeneralPanel';
import { updateBackgroundColour } from '../../../../redux/actions/testMap';
import { setIsDm } from '../../../../redux/actions/auth';

interface StateProps {
	isDm: boolean;
	backgroundColour?: string;
}
interface DispatchProps {
	updateStageBackground: (colour: string) => void;
	setIsDm: (val: boolean) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class GeneralPanelContainer extends Component<Props> {
	render(): ReactNode {
		const { backgroundColour, updateStageBackground, isDm, setIsDm } = this.props;

		return (
			<GeneralPanel
				isDm={isDm}
				setIsDm={setIsDm}
				stageBackground={backgroundColour}
				updateStageBackground={updateStageBackground}
			/>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	backgroundColour:
		state.testMap && state.testMap.map ? state.testMap.map.backgroundColour : null,
	isDm: state.auth.isDm
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	updateStageBackground: (colour: string) => dispatch(updateBackgroundColour(colour)),
	setIsDm: (val: boolean) => dispatch(setIsDm(val))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(GeneralPanelContainer);
