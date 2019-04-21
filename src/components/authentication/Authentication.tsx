import React, { PureComponent, ReactNode } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { login, logout } from '../../redux/actions/auth';

import styles from './Authentication.module.css';

interface StateProps {
	loggedIn: boolean;
}
interface DispatchProps {
	login: (username: string, password: string) => void;
	logout: () => void;
}

type Props = StateProps & DispatchProps;

interface State {
	username: string;
	password: string;
}

class Authentication extends PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		};

		this.updateState = this.updateState.bind(this);
		this.login = this.login.bind(this);
	}

	updateState(prop, val): void {
		let newState = {};
		newState[prop] = val;
		this.setState(newState);
		// ANnoying I couldn't use { [prop]: val }
	}

	login(): void {
		if (this.state.username.length === 0 || this.state.password.length === 0) {
			// TODO: Error
			return;
		}

		this.props.login(this.state.username, this.state.password);
	}

	render(): ReactNode {
		const { loggedIn, logout } = this.props;

		if (loggedIn) {
			return <div />;
		}

		return (
			<div className={styles.wrapper}>
				<TextField
					label="Username"
					onChange={evt => this.updateState('username', evt.target.value)}
					value={this.state.username}
					margin="normal"
				/>
				<TextField
					label="Password"
					onChange={evt => this.updateState('password', evt.target.value)}
					value={this.state.password}
					margin="normal"
					onKeyUp={event => {
						event.keyCode === 13 && this.login(); // Quick login on enter if password is focused.
					}}
				/>
				<Button variant="contained" color="primary" onClick={() => this.login()}>
					Login
				</Button>
			</div>
		);
	}
}

const mapStateToProps = (state): StateProps => ({
	loggedIn: state.auth.loggedIn
});
const mapDispatchToProps = (dispatch): DispatchProps => ({
	login: (username: string, password: string) => dispatch(login(username, password)),
	logout: () => dispatch(logout())
});

export default connect<StateProps, DispatchProps>(
	mapStateToProps,
	mapDispatchToProps
)(Authentication);
