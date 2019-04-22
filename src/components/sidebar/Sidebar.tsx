import React, { Component, ReactNode } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChatContainer from '../chat/ChatContainer';
import ImageUploaderContainer from './panels/imageUploader/ImageUploaderContainer';
import AssetListContainer from '../assets/AssetListContainer';
import CreateAssetContainer from '../assets/CreateAssetContainer';
import SettingsContainer from '../settings/SettingsContainer';
import CharactersContainer from './panels/characters/CharactersContainer';

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
					<Tabs variant="scrollable" value={value} onChange={this.handleChange}>
						<Tab label="Chat" />
						<Tab label="Characters" />
						<Tab label="Upload" />
						<Tab label="Assets" />
						<Tab label="Settings" />
					</Tabs>
				</AppBar>
				{value === 0 && <ChatContainer />}
				{value === 1 && <CharactersContainer />}
				{value === 2 && <ImageUploaderContainer />}
				{value === 3 && (
					<div>
						<CreateAssetContainer />
						<AssetListContainer />
					</div>
				)}
				{value === 4 && <SettingsContainer />}
			</div>
		);
	}
}
