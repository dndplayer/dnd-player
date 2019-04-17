import React, { Component, ReactNode } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChatContainer from '../chat/ChatContainer';

export default class Sidebar extends Component {
	state = {
		value: 0
	};

	handleChange = (event, value): void => {
		this.setState({ value });
	};

	render(): ReactNode {
		const { value } = this.state;
		return (
			<div>
				{/* <AppBar position="static"> */}
				<Tabs value={value} onChange={this.handleChange}>
					<Tab label="Upload" />
					<Tab label="Chat" />
				</Tabs>
				{/* </AppBar> */}
				{value === 0 && <div>Upload</div>}
				{value === 1 && <ChatContainer />}
			</div>
		);
	}
}
