import React, { Component } from 'react';
import { Button } from '@material-ui/core';

export default class FogPanel extends Component {
	render() {
		return (
			<div>
				<Button fullWidth variant="contained">
					Add Polygon
				</Button>
				<Button fullWidth variant="contained">
					Clear all Fog
				</Button>
			</div>
		);
	}
}
