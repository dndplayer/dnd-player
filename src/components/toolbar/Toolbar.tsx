import React, { Component, ReactNode } from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';

const styles = createStyles({
	toolbarWrapper: {
		backgroundColor: 'grey',
		padding: '5px',
		display: 'flex',
		flexDirection: 'row',
		borderTopLeftRadius: '10px',
		borderTopRightRadius: '10px'
	},
	toolbarButton: {
		width: '5vh',
		height: '5vh',
		margin: '5px',
		border: 'none',
		borderRadius: '5px',
		boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.5)',
		cursor: 'pointer',
		'&:hover': {
			background: 'rgba(190,190,190,0.5)'
		}
	}
});

interface Props extends WithStyles<typeof styles> {}

class Toolbar extends Component<Props> {
	render(): ReactNode {
		const { classes } = this.props;
		return (
			<div className={classes.toolbarWrapper}>
				<button className={classes.toolbarButton}>Add Asset</button>
				<button className={classes.toolbarButton}>YY</button>
				<button className={classes.toolbarButton}>ZZ</button>
			</div>
		);
	}
}

export default withStyles(styles)(Toolbar);
