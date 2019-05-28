import React, { Component, ReactNode } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import OverlayTab from './OverlayTab';
import OverlayPanel from './OverlayPanel';
import { OverlayPanelTypes } from '../../models/OverlayPanelTypes';
import UploadListContainer from './panels/uploadList/UploadListContainer';
import AssetListContainer from '../assets/AssetListContainer';
import CreateAssetContainer from '../assets/CreateAssetContainer';
import ImageUploaderContainer from './panels/imageUploader/ImageUploaderContainer';
import GeneralPanelContainer from './panels/general/GeneralPanelContainer';
import MapPanelContainer from './panels/map/MapPanelContainer';
import JournalContainer from './panels/journal/JournalContainer';

interface Props {
	dm: boolean;
	open: boolean;
	openTab: () => void;
	closeTabs: () => void;
	openPanel: (panel: OverlayPanelTypes) => void;
	currentPanel?: OverlayPanelTypes;
}

export default class OverlayTabs extends Component<Props> {
	onClickTab = (panel: OverlayPanelTypes): (() => void) => (): void => {
		if (this.props.open && this.props.currentPanel === panel) {
			this.props.closeTabs();
			// This openPanel(null) causes the active highlight to be removed, but not having this
			// is quite nice because the panel persists through being shut (incase you're editing
			// an input and want to minimize it temporarily)
			this.props.openPanel(null);
		} else {
			this.props.openPanel(panel);
			if (!this.props.open) {
				this.props.openTab();
			}
		}
	};

	render(): ReactNode {
		const { open, openPanel, closeTabs } = this.props;
		return (
			<div
				style={{
					zIndex: 99,
					position: 'absolute' as 'absolute',
					top: 0,
					bottom: 0,
					right: 0,
					transform: `translateX(${open ? 0 : '400px'})`,
					display: 'flex',
					flexDirection: 'row',
					transition: 'transform 300ms',
					transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
					WebkitTransitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
				}}
			>
				<div
					style={{
						// display: 'flex',
						// flexDirection: 'column',
						// justifyContent: 'center',
						//width: '40px',
						position: 'absolute' as 'absolute',
						top: '50%',
						left: '-43px' // 40px for alignment then 3px for the margin in Tab
					}}
				>
					{this.props.dm && (
						<OverlayTab
							text="Uploads"
							name="uploads"
							active={this.props.currentPanel === OverlayPanelTypes.UPLOAD}
							onClick={this.onClickTab(OverlayPanelTypes.UPLOAD)}
						/>
					)}
					<OverlayTab
						text="Assets"
						name="assets"
						active={this.props.currentPanel === OverlayPanelTypes.ASSETS}
						onClick={this.onClickTab(OverlayPanelTypes.ASSETS)}
					/>
					<OverlayTab
						text="General"
						name="general"
						active={this.props.currentPanel === OverlayPanelTypes.GENERAL}
						onClick={this.onClickTab(OverlayPanelTypes.GENERAL)}
					/>
					<OverlayTab
						text="Journal"
						name="journal"
						active={this.props.currentPanel === OverlayPanelTypes.JOURNAL}
						onClick={this.onClickTab(OverlayPanelTypes.JOURNAL)}
					/>
					{this.props.dm && (
						<OverlayTab
							text="Map"
							name="map"
							active={this.props.currentPanel === OverlayPanelTypes.MAP}
							onClick={this.onClickTab(OverlayPanelTypes.MAP)}
						/>
					)}
				</div>
				<div
					style={{
						position: 'relative',
						width: '400px',
						backgroundColor: 'rgba(80, 80, 80, 0.8)'
						// backdropFilter: 'blur(2px)' // Doesn't work in Chrome yet
					}}
				>
					<div
						style={{
							padding: 5,
							backgroundColor: 'red',
							textAlign: 'center',
							position: 'absolute' as 'absolute',
							top: 0,
							left: -42,
							width: 32,
							height: 32,
							opacity: open ? 1 : 0,
							transition: 'opacity 500ms',
							transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
							cursor: 'pointer',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
						onClick={() => {
							closeTabs();
							openPanel(null);
						}}
					>
						<span style={{}}>
							<CloseIcon />
						</span>
					</div>
					{this.props.currentPanel === OverlayPanelTypes.UPLOAD && (
						<OverlayPanel>
							<ImageUploaderContainer />
							<UploadListContainer />
						</OverlayPanel>
					)}
					{this.props.currentPanel === OverlayPanelTypes.ASSETS && (
						<OverlayPanel>
							{this.props.dm && <CreateAssetContainer />}
							<AssetListContainer />
						</OverlayPanel>
					)}
					{this.props.currentPanel === OverlayPanelTypes.GENERAL && (
						<OverlayPanel>
							<GeneralPanelContainer />
						</OverlayPanel>
					)}
					{this.props.currentPanel === OverlayPanelTypes.JOURNAL && (
						<OverlayPanel>
							<JournalContainer />
						</OverlayPanel>
					)}
					{this.props.currentPanel === OverlayPanelTypes.MAP && (
						<OverlayPanel>
							<MapPanelContainer />
						</OverlayPanel>
					)}
				</div>
			</div>
		);
	}
}
