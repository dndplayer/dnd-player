import React, { Component, ReactNode, SyntheticEvent } from 'react';
import { Switch, FormControlLabel, Button, Tooltip } from '@material-ui/core';

import styles from './GeneralPanel.module.css';
import { NonPlayerCharacter } from '../../../../5e/models/Character';

interface State {
	stageBackground: string;
	isDm: boolean;
	roomUrlCopiedTooltipOpen: boolean;
	roomUrlTooltipTimeout: any;
}

interface Props {
	stageBackground: string;
	isDm: boolean;
	roomUrl: string;
	updateStageBackground: (value: string) => void;
	setIsDm: (val: boolean) => void;
	nonPlayerCharacters: NonPlayerCharacter[];
	updateNonPlayerCharacter: (characterId: string, character: NonPlayerCharacter) => void;
	saveNewNonPlayerCharacter: (character: NonPlayerCharacter) => void;
}

export default class GeneralPanel extends Component<Props, State> {
	constructor(props) {
		super(props);

		this.onChangeStageBackground = this.onChangeStageBackground.bind(this);
		this.onChangeIsDm = this.onChangeIsDm.bind(this);
	}

	state = {
		roomUrlCopiedTooltipOpen: false,
		roomUrlTooltipTimeout: null,
		isDm: this.props.isDm,
		stageBackground: this.props.stageBackground || '#ffffff'
	};

	componentDidUpdate(prevProps, prevState): void {
		if (prevProps.stageBackground !== this.props.stageBackground) {
			this.setState({ stageBackground: this.props.stageBackground });
		}
	}

	onChangeStageBackground = (e): void => {
		this.setState({ onChangeStageBackground: e.target.value } as any);

		if (this.props.updateStageBackground) {
			this.props.updateStageBackground(e.target.value);
		}
	};

	onChangeIsDm = (e): void => {
		this.setState({ isDm: !!e.target.checked });

		if (this.props.setIsDm) {
			this.props.setIsDm(!!e.target.checked);
		}
	};

	copyRoomUrl = (): void => {
		const el = document.createElement('textarea');
		el.value = this.props.roomUrl;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);

		const timeout = setTimeout(() => {
			this.setState({
				roomUrlCopiedTooltipOpen: false,
				roomUrlTooltipTimeout: null
			});
		}, 4000);

		if (this.state.roomUrlTooltipTimeout) {
			clearTimeout(this.state.roomUrlTooltipTimeout);
		}

		this.setState({
			roomUrlCopiedTooltipOpen: true,
			roomUrlTooltipTimeout: timeout
		});
	};

	importNpcs(): void {
		const input = prompt('enter NPC json...');
		const obj = JSON.parse(input);
		if (!obj) {
			alert('Failed to parse JSON.');
			return;
		}

		for (const npc of obj) {
			const existing = this.props.nonPlayerCharacters.find(y => y.name === npc.name);
			if (existing) {
				this.props.updateNonPlayerCharacter(existing.id, npc);
			} else {
				this.props.saveNewNonPlayerCharacter(npc);
			}
		}

		alert('Done!');
	}

	exportNpcs(): void {
		const el = document.createElement('textarea');
		el.value = JSON.stringify(this.props.nonPlayerCharacters);
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
		alert('NPC JSON copied to clipboard.');
	}

	render(): ReactNode {
		return (
			<div className={styles.generalPanel}>
				<h1>General</h1>

				<h2>TODO:</h2>
				<ul style={{ marginBottom: '50px' }}>
					<li>Logout button</li>
				</ul>

				<div className={styles.settingWrapper}>
					<div className={styles.settingRow}>
						<Tooltip
							PopperProps={{
								disablePortal: true
							}}
							placement="top"
							open={this.state.roomUrlCopiedTooltipOpen}
							disableFocusListener
							disableHoverListener
							disableTouchListener
							title="Copied!"
						>
							<Button variant="contained" fullWidth onClick={this.copyRoomUrl}>
								Copy Room URL
							</Button>
						</Tooltip>
					</div>

					<div className={styles.settingRow}>
						<input
							type="color"
							id="stageBackground"
							name="stageBackground"
							onChange={this.onChangeStageBackground}
							value={this.state.stageBackground}
							style={{
								margin: '.4rem'
							}}
						/>
						<label
							htmlFor="stageBackground"
							style={{ font: '1rem "Fira Sans", sans-serif' }}
						>
							Map Background Colour
						</label>
					</div>

					<Button onClick={() => this.importNpcs()}>Import NPCs</Button>
					<Button onClick={() => this.exportNpcs()}>Export NPCs</Button>

					<div className={styles.settingRow}>
						<FormControlLabel
							control={
								<Switch value={this.state.isDm} onChange={this.onChangeIsDm} />
							}
							label="Is DM?"
						/>
					</div>
				</div>
			</div>
		);
	}
}