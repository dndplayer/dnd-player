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

import { MapData, MapLayer } from '../../../../models/Map';

import styles from './MapPanel.module.css';

interface State {
	currActiveMapId: string;
}

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
	maps: MapData[];
	setActiveMap: (mapId: string) => void;
	setLayerLocked: (mapId: string, layerId: string, checked: boolean) => void;
}

export default class MapPanel extends Component<Props, State> {
	state = {
		currActiveMapId: this.props.activeMapId
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.props.activeMapId !== this.state.currActiveMapId) {
			this.setState({ currActiveMapId: this.props.activeMapId });
		}
	}

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

	onChangeActiveMap = (e: any): void => {
		this.setState({
			currActiveMapId: e.target.value
		});
	};

	changeMap = (): void => {
		console.log(`Changing Map to ${this.state.currActiveMapId}`);
		if (this.props.setActiveMap) {
			this.props.setActiveMap(this.state.currActiveMapId);
		}
	};

	addNewMap = (): void => {
		alert('NOT YET IMPLEMENTED.');
	};

	setLayerLocked = (layerId: string, checked: boolean): void => {
		if (this.props.setLayerLocked) {
			this.props.setLayerLocked(this.props.activeMapId, layerId, checked);
		}
	};

	render(): ReactNode {
		const { fogEditMode, fogAddMode } = this.props;

		if (!this.props.activeMap || !this.props.activeMapId || !this.props.maps) {
			return <div>Loading...</div>;
		}

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
								<Switch checked={fogEditMode} onChange={this.onFogEditToggle} />
							}
							label="Fog Edit Mode"
						/>
					</FormGroup>

					<FormGroup row>
						<FormControlLabel
							control={<Switch checked={fogAddMode} onChange={this.onFogAddToggle} />}
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

				<Paper style={{ marginTop: 30, padding: 5 }}>
					<Typography variant="body1" component="p">
						Active Map ID {this.props.activeMapId}
					</Typography>
					<select defaultValue={this.props.activeMapId} onChange={this.onChangeActiveMap}>
						{this.props.maps.map(x => (
							<option key={x.id} value={x.id}>
								{x.id}
							</option>
						))}
					</select>
					<button onClick={this.changeMap}>Change!</button>
					<div>
						Warning: This is still a little buggy! E.g. You need to refresh once changed
					</div>
					<Button fullWidth variant="outlined" color="secondary" onClick={this.addNewMap}>
						Add new Map
					</Button>
				</Paper>

				<Paper style={{ marginTop: 30, padding: 5 }}>
					<Typography variant="h5" component="h3">
						Layer Locking
					</Typography>
					{this.props.activeMap &&
						Object.keys(this.props.activeMap.layers).map(x => {
							const l = this.props.activeMap.layers[x] as MapLayer;

							return (
								<FormGroup row key={x}>
									<FormControlLabel
										control={
											<Switch
												checked={l.locked}
												onChange={e => {
													this.setLayerLocked(x, e.target.checked);
												}}
											/>
										}
										label={x}
									/>
								</FormGroup>
							);
						})}
				</Paper>
			</div>
		);
	}
}
