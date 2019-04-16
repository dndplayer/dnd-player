import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

interface State {
	file: File;
	uploadName: string;
}
interface Props {
	onUpload: (name: string, file: File, filePath: string) => void;
}
export default class ImageUploader extends Component<Props, State> {
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

	onUpload(event): void {
		if (!this.state.file) {
			return;
		}
		if (!this.state.uploadName || this.state.uploadName.length === 0) {
			return;
		}

		const filePath = `uploads/${uuidv4()}`;
		this.props.onUpload(this.state.uploadName, this.state.file, filePath);
	}

	render() {
		return (
			<div>
				<input
					placeholder="Upload Name"
					onChange={event => this.setState({ uploadName: event.target.value })}
					type="text"
				/>
				<input onChange={this.onChangeFile} type="file" />
				<button onClick={this.onUpload}>Upload</button>
			</div>
		);
	}
}
