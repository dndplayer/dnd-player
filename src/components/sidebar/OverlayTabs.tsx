import React, { Component, ReactNode } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import OverlayTab from './OverlayTab';
import OverlayPanel from './OverlayPanel';
import { OverlayPanelTypes } from '../../models/OverlayPanelTypes';
import UploadListContainer from './panels/uploadList/UploadListContainer';
import AssetListContainer from '../assets/AssetListContainer';
import CreateAssetContainer from '../assets/CreateAssetContainer';
import ImageUploaderContainer from './panels/imageUploader/ImageUploaderContainer';

interface Props {
	open: boolean;
	openTab: () => void;
	closeTabs: () => void;
	openPanel: (panel: OverlayPanelTypes) => void;
	currentPanel?: OverlayPanelTypes;
}

export default class OverlayTabs extends Component<Props> {
	onClickTab = (panel: OverlayPanelTypes): (() => void) => (): void => {
		this.props.openPanel(panel);
		if (!this.props.open) {
			this.props.openTab();
		}
	};

	render(): ReactNode {
		const { open, openTab, closeTabs } = this.props;
		return (
			<div
				style={{
					zIndex: 99,
					position: 'absolute' as 'absolute',
					top: 0,
					bottom: 0,
					right: open ? 0 : -400,
					display: 'flex',
					flexDirection: 'row',
					transition: 'right 500ms',
					transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
					WebkitTransitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center'
					}}
				>
					<OverlayTab
						text="Uploads"
						name="uploads"
						onClick={this.onClickTab(OverlayPanelTypes.UPLOAD)}
					/>
					<OverlayTab
						text="Assets"
						name="assets"
						onClick={this.onClickTab(OverlayPanelTypes.ASSETS)}
					/>
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
						onClick={() => closeTabs()}
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
							<CreateAssetContainer />
							<AssetListContainer />
						</OverlayPanel>
					)}
				</div>
			</div>
		);
	}
}
