import React, { Component, ReactNode, CSSProperties } from 'react';
import { connect } from 'react-redux';
import Toolbar from './Toolbar';

interface StateProps {}
interface DispatchProps {}
interface OwnProps {
	style?: CSSProperties;
}

type Props = StateProps & DispatchProps & OwnProps;

class ToolbarContainer extends Component<Props> {
	render(): ReactNode {
		return (
			<div style={this.props.style}>
				<Toolbar />
			</div>
		);
	}
}

const mapStateToProps = (state): StateProps => ({});
const mapDispatchToProps = (dispatch): DispatchProps => ({});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(ToolbarContainer);
