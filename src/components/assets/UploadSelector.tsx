import React, { Component, ReactNode, ReactElement } from 'react';
import { FormControl, InputLabel, Select, MenuItem, StyledComponentProps } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { Upload } from '../../models/Upload';

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
	options: Upload[];
	onChange: (uploadId: string) => void;
}

interface State {
	current: string;
}

class UploadSelector extends Component<Props, State> {
	state = {
		current: ''
	};
	handleChange = (event): void => {
		this.setState({ current: event.target.value });
		if (this.props.onChange) {
			this.props.onChange(event.target.value);
		}
	};
	render(): ReactNode {
		const { classes, options } = this.props;
		return (
			<FormControl className={classes.formControl}>
				<InputLabel htmlFor="upload-input">Images</InputLabel>
				<Select
					value={this.state.current}
					onChange={this.handleChange}
					inputProps={{
						name: 'upload',
						id: 'upload-input'
					}}
				>
					{options.map(
						(x: Upload): ReactElement => (
							<MenuItem key={x.id} value={x.id}>
								{x.name}
							</MenuItem>
						)
					)}
				</Select>
			</FormControl>
		);
	}
}

export default withStyles(styles)(UploadSelector);
