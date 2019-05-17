import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import MapPanel from './MapPanel';
import { enableFogEditMode, disableFogEditMode } from '../../../../redux/actions/maps';

interface StateProps {
	fogEditMode: boolean;
}
interface DispatchProps {
	enableFogEditMode: () => void;
	disableFogEditMode: () => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class MapPanelContainer extends Component<Props> {
	render(): ReactNode {
		const { enableFogEditMode, disableFogEditMode, fogEditMode } = this.props;

		return (
			<MapPanel
				fogEditMode={fogEditMode}
				enableFogEditMode={enableFogEditMode}
				disableFogEditMode={disableFogEditMode}
			/>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	fogEditMode: state.maps.fogEditMode
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	enableFogEditMode: () => dispatch(enableFogEditMode()),
	disableFogEditMode: () => dispatch(disableFogEditMode())
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(MapPanelContainer);
