import React, { Component } from 'react';

interface State {
	file: File;
}
interface Props {
	onUpload: (file: File, filePath: string) => void;
}
export default class ImageUploader extends Component<Props, State> {
	constructor(props) {
		super(props);

		this.state = {
			file: null
		};

		this.onUpload = this.onUpload.bind(this);
		this.onChangeFile = this.onChangeFile.bind(this);
	}

	onChangeFile(event) {
		const file = event.target.files[0];
		this.setState({
			file: file
		});
	}

	onUpload(event) {
		if (!this.state.file) {
			return;
		}

		this.props.onUpload(this.state.file, 'testfile');
	}

	render() {
		return (
			<div>
				<input onChange={this.onChangeFile} type="file" />
				<button onClick={this.onUpload}>Upload</button>
			</div>
		);
	}
}
