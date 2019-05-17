import React, { Component, ReactNode, ChangeEvent } from 'react';
import { Button, Switch, Paper, Typography, FormControlLabel, FormGroup } from '@material-ui/core';

interface Props {
	enableFogEditMode: () => void;
	disableFogEditMode: () => void;
	fogEditMode: boolean;
}

export default class MapPanel extends Component<Props> {
	onFogEditToggle = (e: ChangeEvent<HTMLInputElement>, checked: boolean): void => {
		if (checked) {
			this.props.enableFogEditMode();
		} else {
			this.props.disableFogEditMode();
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

					<Button fullWidth variant="contained">
						Add Fog Polygon
					</Button>
				</Paper>

				<Typography variant="body1" component="p">
					<i>This is WIP</i>
				</Typography>
			</div>
		);
	}
}
