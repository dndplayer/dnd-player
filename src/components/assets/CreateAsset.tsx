import React, { Component, ReactNode, ChangeEvent } from 'react';
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import UploadSelector from './UploadSelector';
import { Upload } from '../../models/Upload';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { AssetType } from '../../models/AssetType';
import AssetTypeSelector from './AssetTypeSelector';

interface Props {
	uploads: Upload[];
	classes: any;
	saveNewAsset: (assetType: AssetType, asset: any) => void;
}

interface State {
	name: string;
	assetType: AssetType;
	uploadId: string;
}

const styles = (theme): any => ({
	button: {
		margin: theme.spacing.unit
	},
	leftIcon: {
		marginRight: theme.spacing.unit
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	iconSmall: {
		fontSize: 20
	},
	nameInput: {
		margin: theme.spacing.unit
	}
});

class CreateAsset extends Component<Props, State> {
	state = {
		name: '',
		assetType: AssetType.PlayerCharacter,
		uploadId: null
	};

	onSave = (): void => {
		const upload = this.props.uploads.find(x => x.id === this.state.uploadId);
		const data: any = {
			imageRef: upload ? upload.filePath : '',
			name: this.state.name
		};
		this.props.saveNewAsset(this.state.assetType, data);
	};

	onChangeUpload = (uploadId: string): void => this.setState({ uploadId });
	onChangeAssetType = (assetType: AssetType): void => this.setState({ assetType });
	onChangeName = (
		evt: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	): void => this.setState({ name: evt.currentTarget.value });

	render(): ReactNode {
		const { classes, uploads } = this.props;
		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<h1>Create Asset</h1>
				<AssetTypeSelector onChange={this.onChangeAssetType} />
				<TextField
					label="Name"
					margin="normal"
					className={classes.nameInput}
					value={this.state.name}
					onChange={this.onChangeName}
				/>
				<UploadSelector onChange={this.onChangeUpload} options={uploads} />
				<Button variant="contained" className={classes.button} onClick={this.onSave}>
					<SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
					Save
				</Button>
			</div>
		);
	}
}

export default withStyles(styles)(CreateAsset);
