import React, { Component, ReactNode } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { AssetType } from '../../models/AssetType';

const styles = (theme): any => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2
	}
});

interface Props {
	classes: any;
	onChange: (assetType: AssetType) => void;
}

interface State {
	current: AssetType;
}

class AssetTypeSelector extends Component<Props, State> {
	state = {
		current: AssetType.PlayerCharacter
	};
	handleChange = (event): void => {
		this.setState({ current: event.target.value });
		if (this.props.onChange) {
			this.props.onChange(event.target.value);
		}
	};
	render(): ReactNode {
		const { classes } = this.props;
		return (
			<FormControl className={classes.formControl}>
				<InputLabel htmlFor="assetType-input">Asset Type</InputLabel>
				<Select
					value={this.state.current}
					onChange={this.handleChange}
					inputProps={{
						name: 'assetType',
						id: 'assetType-input'
					}}
				>
					<MenuItem value={AssetType.PlayerCharacter}>Player Character</MenuItem>
					<MenuItem value={AssetType.NonPlayerCharacter}>Non Player Character</MenuItem>
				</Select>
			</FormControl>
		);
	}
}

export default withStyles(styles)(AssetTypeSelector);
