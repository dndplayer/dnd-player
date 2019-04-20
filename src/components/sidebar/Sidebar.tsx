import React, { Component, ReactNode } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChatContainer from '../chat/ChatContainer';
import ImageUploaderContainer from '../imageUploader/ImageUploaderContainer';
import AssetListContainer from '../assets/AssetListContainer';
import CreateAssetContainer from '../assets/CreateAssetContainer';

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
				<AppBar position="static">
					<Tabs value={value} onChange={this.handleChange}>
						<Tab label="Upload" />
						<Tab label="Assets" />
						<Tab label="Chat" />
					</Tabs>
				</AppBar>
				{value === 0 && (
					<div>
						<ImageUploaderContainer />
						{/* <AssetListContainer /> */}
						<CreateAssetContainer />
					</div>
				)}
				{value === 1 && <AssetListContainer />}
				{value === 2 && <ChatContainer />}
			</div>
		);
	}
}
