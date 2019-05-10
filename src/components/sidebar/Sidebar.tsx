import React, { Component, ReactNode } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ImageUploaderContainer from './panels/imageUploader/ImageUploaderContainer';
import AssetListContainer from '../assets/AssetListContainer';
import CreateAssetContainer from '../assets/CreateAssetContainer';
import UploadListContainer from './panels/uploadList/UploadListContainer';

export default class Sidebar extends Component {
	state = {
		value: 'upload'
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
						{/* <Tab value='chat' label="Chat" /> */}
						<Tab value="upload" label="Upload" />
						<Tab value="assets" label="Assets" />
					</Tabs>
				</AppBar>
				{/* {value === 'chat' && <ChatContainer />} */}
				{value === 'upload' && (
					<div>
						<ImageUploaderContainer />
						<UploadListContainer />
					</div>
				)}
				{value === 'assets' && (
					<div>
						<CreateAssetContainer />
						<AssetListContainer />
					</div>
				)}
			</div>
		);
	}
}
