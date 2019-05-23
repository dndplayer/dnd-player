import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { User } from '../../models/User';
import Userlist from './UserList';
import { AppState } from '../../redux/reducers';
import { getAllUsers } from '../../redux/selectors/users';

interface StateProps {
	users: User[];
	onlineUsers: string[];
	userListOpen: boolean;
}
interface DispatchProps {}
interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class UserListContainer extends Component<Props> {
	render(): ReactNode {
		const { users, userListOpen } = this.props;

		return <Userlist users={users} open={userListOpen} />;
	}
}

const mapStateToProps = (state: AppState): StateProps => ({
	users: getAllUsers(state),
	onlineUsers: state.users.onlineUsers,
	userListOpen: state.ui.userListOpen
});
const mapDispatchToProps = (dispatch): DispatchProps => ({});

export default connect<StateProps, DispatchProps, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(UserListContainer);
