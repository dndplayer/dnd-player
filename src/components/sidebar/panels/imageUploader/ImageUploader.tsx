import React, { Component, ReactNode } from 'react';
import {
	withStyles,
	WithStyles,
	TextField,
	Button,
	Input,
	LinearProgress
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
			file: null
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

		// TODO: Validate input I.E. valid name (alphanumeric + dash/underscore)

		this.props.onUpload(this.state.uploadName, this.state.file);
	}

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
