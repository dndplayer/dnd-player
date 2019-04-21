import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Settings from './Settings';
import { logout } from '../../redux/actions/auth';

interface StateProps {
	loggedIn: boolean;
}
interface DispatchProps {
	logout: () => void;
}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class SettingsContainer extends Component<Props> {
	render(): ReactNode {
		return <Settings loggedIn={this.props.loggedIn} logout={this.props.logout} />;
	}
}

const mapStateToProps = (state): StateProps => ({
	loggedIn: state.auth.loggedIn
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	logout: () => dispatch(logout())
});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(SettingsContainer);
