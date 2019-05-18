import React, { Component, ReactNode, ChangeEvent } from 'react';
import {
	Button,
	Switch,
	Paper,
	Typography,
	FormControlLabel,
	FormGroup,
	Input
} from '@material-ui/core';
import ColorPicker from 'material-ui-color-picker';

import { MapData } from '../../../../models/Map';

import styles from './MapPanel.module.css';

interface Props {
	enableFogEditMode: () => void;
	disableFogEditMode: () => void;
	enableFogAddMode: () => void;
	disableFogAddMode: () => void;
	fogEditMode: boolean;
	fogAddMode: boolean;
	activeMapId: string;
	activeMap?: MapData;
	updateFogColour: (mapId: string, colour: string) => void;
	updateStageBackground: (mapId: string, colour: string) => void;
}

export default class MapPanel extends Component<Props> {
	onFogEditToggle = (e: ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		if (checked) {
			this.props.enableFogEditMode();
		} else {
			this.props.disableFogEditMode();
		}
	};

	onFogAddToggle = (e: ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		if (checked) {
			this.props.enableFogAddMode();
		} else {
			this.props.disableFogAddMode();
		}
	};

	onChangeStageBackground = (colour: string): void => {
		if (!this.props.activeMapId || !colour) {
			return;
		}
		if (this.props.updateStageBackground) {
			this.props.updateStageBackground(this.props.activeMapId, colour);
		}
	};

	onChangeFogColour = (colour: string): void => {
		if (!this.props.activeMapId || !colour) {
			return;
		}
		if (this.props.updateFogColour) {
			this.props.updateFogColour(this.props.activeMapId, colour);
		}
	};

	render(): ReactNode {
		return (
			<div>
				<Typography variant="h4" component="h1">
					Map Bits
				</Typography>

				<Paper style={{ marginTop: 20, padding: 5 }}>
					<Typography variant="h5" component="h3">
						Fog Settings
					</Typography>

					<FormGroup row>
						<FormControlLabel
							control={
								<Switch
									value={this.props.fogEditMode}
									onChange={this.onFogEditToggle}
								/>
							}
							label="Fog Edit Mode"
						/>
					</FormGroup>

					<FormGroup row>
						<FormControlLabel
							control={
								<Switch
									value={this.props.fogAddMode}
									onChange={this.onFogAddToggle}
								/>
							}
							label="Fog Add Mode"
						/>
					</FormGroup>

					{/* Old Pure HTML colour picker way, for reference */}
					{/* <div className={styles.settingRow}>
						<input
							type="color"
							id="stageBackground"
							name="stageBackground"
							onChange={this.onChangeStageBackground}
							value={this.state.stageBackground}
							style={{
								margin: '.4rem'
							}}
						/>
						<label
							htmlFor="stageBackground"
							style={{ font: '1rem "Fira Sans", sans-serif' }}
						>
							Map Background Colour
						</label>
					</div> */}

					<FormGroup row>
						<ColorPicker
							fullWidth
							label="Background Colour"
							name="stageColor"
							defaultValue={
								this.props.activeMap
									? this.props.activeMap.backgroundColour
									: '#000000'
							}
							// value={this.state.color} - for controlled component
							onChange={this.onChangeStageBackground}
						/>
					</FormGroup>

					<FormGroup row>
						<ColorPicker
							fullWidth
							label="Fog Colour"
							name="fogColor"
							defaultValue={
								this.props.activeMap
									? this.props.activeMap.fog.colour || '#000000'
									: '#000000'
							}
							// value={this.state.color} - for controlled component
							onChange={this.onChangeFogColour}
						/>
					</FormGroup>
				</Paper>

				<Typography variant="body1" component="p">
					<i>This is WIP</i>
				</Typography>
			</div>
		);
	}
}
