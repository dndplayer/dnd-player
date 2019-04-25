import React, { Component } from 'react';
import { Button } from '@material-ui/core';

interface Props {
	loggedIn: boolean;
	logout: () => void;
}
export default class Settings extends Component<Props> {
	copyRoomUrl(): void {
		const el = document.createElement('textarea');
		const settings = JSON.parse(localStorage.getItem('firebaseConfig'));
		el.value = document.location + `?projectId=${settings.projectId}&apiKey=${settings.apiKey}`;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
	}

	render() {
		return (
			<div className="column">
				<h1>Settings</h1>
				<Button onClick={this.copyRoomUrl}>Copy Room URL</Button>
				{this.props.loggedIn && (
					<Button variant="contained" color="primary" onClick={this.props.logout}>
						Logout
					</Button>
				)}
			</div>
		);
	}
}
