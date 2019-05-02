import React, { Component, ReactNode } from 'react';
import {
	withStyles,
	WithStyles,
	TextField,
	Button,
	Input,
	LinearProgress,
	Select,
	MenuItem,
	FormControl,
	InputLabel
} from '@material-ui/core';

const styles = (theme): any => ({
	wrapper: {
		// backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'column',
		padding: '5px'
	},
	button: {
		marginTop: '10px',
		marginBottom: '10px'
	}
});

interface State {
	file: File;
	uploadName: string;
	hitAreaType: string;
}
interface Props extends WithStyles<typeof styles> {
	onUpload: (name: string, file: File) => void;
	progress: number;
	inProgress: boolean;
}
class ImageUploader extends Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			uploadName: '',
			file: null,
			hitAreaType: 'default'
		};

		this.onUpload = this.onUpload.bind(this);
		this.onChangeFile = this.onChangeFile.bind(this);
	}

	onChangeFile(event): void {
		const file = event.target.files[0];
		this.setState({
			file: file
		});
	}

	onUpload(event: React.MouseEvent): void {
		if (!this.state.file) {
			return;
		}
		if (!this.state.uploadName || this.state.uploadName.length === 0) {
			return;
		}

		const reg = new RegExp(/^[a-z0-9_-]+$/, 'i');
		const isValidName = reg.test(this.state.uploadName);

		if (!isValidName) {
			// TODO: Highlight input as invalid
			return;
		}

		this.props.onUpload(this.state.uploadName, this.state.file);
	}

	handleHitAreaTypeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		this.setState({ hitAreaType: e.target.value });
	};

	render(): ReactNode {
		const { classes } = this.props;
		return (
			<div className={classes.wrapper}>
				<TextField
					label="Upload Name"
					onChange={event => this.setState({ uploadName: event.target.value })}
					disabled={this.props.inProgress}
					margin="normal"
				/>
				<Input onChange={this.onChangeFile} type="file" margin="dense" />
				<Button
					className={classes.button}
					variant="contained"
					onClick={this.onUpload}
					disabled={this.props.inProgress}
					color="primary"
				>
					Upload
				</Button>
				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="hitAreaType">Hit Area Type</InputLabel>
					<Select
						value={this.state.hitAreaType}
						onChange={this.handleHitAreaTypeChange}
						inputProps={{ name: 'hitAreaType', id: 'hitAreaType' }}
					>
						<MenuItem value="default">Default (Bounds)</MenuItem>
						<MenuItem value="circle">Circle</MenuItem>
					</Select>
				</FormControl>
				<LinearProgress
					value={this.props.progress}
					variant="determinate"
					color="secondary"
				/>
			</div>
		);
	}
}

export default withStyles(styles)(ImageUploader);
