import React, { Component, ReactNode } from 'react';
import { TextField } from '@material-ui/core';
import { Journal as JournalModel } from '../../../../models/User';

import styles from './Journal.module.scss';

interface Props {
	privateJournal: JournalModel;
	publicJournal: JournalModel;
	updatePrivateJournal: (journal: JournalModel) => void;
	updatePublicJournal: (journal: JournalModel) => void;
}

interface State {
	privateJournalData: string;
	publicJournalData: string;
}

export default class Journal extends Component<Props, State> {
	state = {
		privateJournalData: this.props.privateJournal ? this.props.privateJournal.data : '',
		publicJournalData: this.props.publicJournal ? this.props.publicJournal.data : ''
	};

	componentDidUpdate(prevProps, prevState): void {
		if (this.props.privateJournal !== prevProps.privateJournal) {
			this.setState({ privateJournalData: this.props.privateJournal.data });
		}

		if (this.props.publicJournal !== prevProps.publicJournal) {
			this.setState({ publicJournalData: this.props.publicJournal.data });
		}
	}

	savePrivate = (): void => {
		let d = {
			...this.props.privateJournal
		};
		d.data = this.state.privateJournalData;
		this.props.updatePrivateJournal(d);
	};
	savePublic = (): void => {
		let d = {
			...this.props.publicJournal
		};
		d.data = this.state.publicJournalData;
		this.props.updatePublicJournal(d);
	};

	onChangePrivateJournal = (val: string): void => {
		if (this._timeoutPrivate) {
			clearTimeout(this._timeoutPrivate);
		}
		this._timeoutPrivate = setTimeout(() => this.savePrivate(), 1000);

		this.setState({ privateJournalData: val });
	};

	onChangePublicJournal = (val: string): void => {
		if (this._timeoutPublic) {
			clearTimeout(this._timeoutPublic);
		}
		this._timeoutPublic = setTimeout(() => this.savePublic(), 1000);

		this.setState({ publicJournalData: val });
	};

	private _timeoutPrivate?: NodeJS.Timeout;
	private _timeoutPublic?: NodeJS.Timeout;

	render(): ReactNode {
		const { privateJournal, publicJournal } = this.props;

		return (
			<div className={styles.journalWrapper}>
				<div className={styles.journalRow}>
					<TextField
						className={styles.journalTextField}
						variant="outlined"
						label="Private"
						fullWidth
						multiline
						onChange={e => this.onChangePrivateJournal(e.target.value)}
						value={this.state.privateJournalData}
					/>
				</div>

				<div className={styles.journalRow}>
					<TextField
						className={styles.journalTextField}
						variant="outlined"
						label="Public"
						fullWidth
						multiline
						onChange={e => this.onChangePublicJournal(e.target.value)}
						value={this.state.publicJournalData}
					/>
				</div>
			</div>
		);
	}
}
