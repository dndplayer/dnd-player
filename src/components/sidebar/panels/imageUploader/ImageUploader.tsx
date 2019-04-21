import React, { Component, ReactNode } from 'react';
import uuidv4 from 'uuid/v4';

import styles from './ImageUploader.module.css';

interface State {
	file: File;
	uploadName: string;
}
interface Props {
	onUpload: (name: string, file: File, filePath: string) => void;
	progress: number;
	inProgress: boolean;
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

	render(): ReactNode {
		return (
			<div className={styles.wrapper}>
				<div>
					<input
						className={styles.fileInput}
						placeholder="Upload Name"
						onChange={event => this.setState({ uploadName: event.target.value })}
						type="text"
						disabled={this.props.inProgress}
					/>
					<input onChange={this.onChangeFile} type="file" />
					<button
						className={styles.button}
						onClick={this.onUpload}
						disabled={this.props.inProgress}
					>
						Upload
					</button>
				</div>
				<progress className={styles.progressBar} max="100" value={this.props.progress} />
			</div>
		);
	}
}
