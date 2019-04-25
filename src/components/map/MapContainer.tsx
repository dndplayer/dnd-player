import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Map from './Map';
import { testMapUpdatePosition } from '../../redux/actions/testMap';

interface StateProps {
	zoom: number;
	testMap: any;
}
interface DispatchProps {
	onUpdatePosition: (data) => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class MapContainer extends Component<Props> {
	render(): ReactNode {
		const { zoom, testMap, onUpdatePosition } = this.props;
		return (
			<Map
				updateSpriteLocation={() => {}}
				zoom={zoom}
				testMap={testMap}
				onUpdatePosition={onUpdatePosition}
			/>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	zoom: state.map.zoom,
	testMap: state.testMap.map
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	onUpdatePosition: data => dispatch(testMapUpdatePosition(data))
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(MapContainer);
