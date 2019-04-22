import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Map from './Map';

interface StateProps {
	zoom: number;
}
interface DispatchProps {}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class MapContainer extends Component<Props> {
	render(): ReactNode {
		const { zoom } = this.props;
		return <Map updateSpriteLocation={() => {}} zoom={zoom} />;
	}
}

const mapStateToProps = (state): StateProps => ({
	zoom: state.map.zoom
});
const mapDispatchToProps = (dispatch): DispatchProps => ({});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(MapContainer);
