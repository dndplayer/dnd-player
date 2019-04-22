import React, { Component, ReactNode } from 'react';
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import UploadSelector from './UploadSelector';
import { Upload } from '../../models/Upload';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Asset } from '../../models/Asset';

interface Props {
	uploads: Upload[];
	classes: any;
	saveNewAsset: (asset: Asset) => void;
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

class CreateAsset extends Component<Props> {
	onSave = (): void => {
		const a: Asset = {
			imageUrl: 'xyz',
			type: 0
		};
		this.props.saveNewAsset(a);
	};

	onChangeUpload = (uploadId: string): void => {};

	render(): ReactNode {
		const { classes, uploads } = this.props;
		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<h1>Create Asset</h1>
				<TextField label="Name" margin="normal" className={classes.nameInput} />
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
