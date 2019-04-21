import React, { Component } from 'react';
import { Button } from '@material-ui/core';

interface Props {
	loggedIn: boolean;
	logout: () => void;
}
export default class Settings extends Component<Props> {
	render() {
		return (
			<div>
				<h1>Settings</h1>
				{this.props.loggedIn && (
					<Button variant="contained" color="primary" onClick={this.props.logout}>
						Logout
					</Button>
				)}
			</div>
		);
	}
}
