import React, { Component } from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/core';

const styles = createStyles({
	viewControlWrapper: {
		backgroundColor: 'grey',
		padding: '8px',
		display: 'flex',
		flexDirection: 'column',
		borderTopLeftRadius: '10px',
		borderBottomLeftRadius: '10px'
	},
	viewControlButton: {
		width: '3vh',
		height: '3vh',
		margin: '3px',
		border: 'none',
		borderRadius: '5px',
		boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.5)',
		cursor: 'pointer',
		'&:hover': {
			background: 'rgba(190,190,190,0.5)'
		}
	}
});

interface Props extends WithStyles<typeof styles> {
	mapZoomIn: () => void;
	mapZoomOut: () => void;
}

class ViewControls extends Component<Props> {
	render() {
		const { classes, mapZoomIn, mapZoomOut } = this.props;
		return (
			<div className={classes.viewControlWrapper}>
				<button className={classes.viewControlButton} onClick={mapZoomIn}>
					+
				</button>
				<button className={classes.viewControlButton} onClick={mapZoomOut}>
					-
				</button>
			</div>
		);
	}
}

export default withStyles(styles)(ViewControls);
