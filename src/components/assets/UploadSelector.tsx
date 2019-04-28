import React, { Component, ReactNode, ReactElement } from 'react';
import { FormControl, InputLabel, MenuItem, StyledComponentProps } from '@material-ui/core';
import Select from 'react-select';
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
	sortedOptions: Upload[];
}

class UploadSelector extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			current: '',
			sortedOptions: this.sortOptions(this.props.options)
		};
	}

	componentDidUpdate(prevProps, prevState): void {
		if (prevProps.options != this.props.options) {
			this.setState({
				sortedOptions: this.sortOptions(this.props.options)
			});
		}
	}

	sortOptions = (opts): Upload[] => {
		// Spread the array before sorting so we don't mutate the props
		return [...opts].sort((a, b) => a.name.localeCompare(b.name));
	};

	handleChange = (value): void => {
		this.setState({
			current: value
		});
		if (this.props.onChange) {
			this.props.onChange(value);
		}
	};
	render(): ReactNode {
		const { classes, options } = this.props;
		const { sortedOptions } = this.state;
		const mappedOptions = sortedOptions.map(x => ({
			value: x.id,
			label: x.name
		}));
		return (
			<Select
				value={this.state.current}
				onChange={this.handleChange}
				options={mappedOptions}
				placeholder="Image..."
				styles={{
					container: provided => ({ ...provided, color: 'black' })
				}}
			/>
		);
		// return (
		// 	<FormControl className={classes.formControl}>
		// 		<InputLabel htmlFor="upload-input">Images</InputLabel>
		// 		<Select
		// 			value={this.state.current}
		// 			onChange={this.handleChange}
		// 			inputProps={{
		// 				name: 'upload',
		// 				id: 'upload-input'
		// 			}}
		// 		>
		// 			{sortedOptions.map(
		// 				(x: Upload): ReactElement => (
		// 					<MenuItem key={x.id} value={x.id}>
		// 						{x.name}
		// 					</MenuItem>
		// 				)
		// 			)}
		// 		</Select>
		// 	</FormControl>
		// );
	}
}

export default withStyles(styles)(UploadSelector);
