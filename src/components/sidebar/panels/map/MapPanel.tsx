import React, { Component } from 'react';
import { Button, Switch, Paper, Typography, FormControlLabel, FormGroup } from '@material-ui/core';

export default class MapPanel extends Component {
	render() {
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
						<FormControlLabel control={<Switch />} label="Fog Edit Mode" />
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
