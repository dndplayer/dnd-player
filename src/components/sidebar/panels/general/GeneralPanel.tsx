import React, { Component, ReactNode } from 'react';
import { Switch, FormControlLabel, Button, Tooltip } from '@material-ui/core';

import styles from './GeneralPanel.module.css';
import { NonPlayerCharacter } from '../../../../5e/models/Character';
import { MapData } from '../../../../models/Map';

interface State {
	stageBackground: string;
	activeMapId: string;
	roomUrlCopiedTooltipOpen: boolean;
	roomUrlTooltipTimeout: any;
}

interface Props {
	maps: MapData[];
	activeMapId: string;
	setActiveMap: (mapId: string) => void;
	stageBackground: string;
	dm: boolean;
	canBeDm: boolean;
	roomUrl: string;
	nonPlayerCharacters: NonPlayerCharacter[];
	updateStageBackground: (mapId: string, colour: string) => void;
	setDm: (val: boolean) => void;
	updateNonPlayerCharacter: (characterId: string, character: NonPlayerCharacter) => void;
	saveNewNonPlayerCharacter: (character: NonPlayerCharacter) => void;
}

export default class GeneralPanel extends Component<Props, State> {
	constructor(props) {
		super(props);

		this.onChangeStageBackground = this.onChangeStageBackground.bind(this);
		this.onChangeDm = this.onChangeDm.bind(this);
	}

	state = {
		activeMapId: this.props.activeMapId,
		roomUrlCopiedTooltipOpen: false,
		roomUrlTooltipTimeout: null,
		stageBackground: this.props.stageBackground || '#ffffff'
	};

	componentDidUpdate(prevProps, prevState): void {
		if (prevProps.stageBackground !== this.props.stageBackground) {
			this.setState({ stageBackground: this.props.stageBackground });
		}
		if (prevProps.activeMapId !== this.props.activeMapId) {
			this.setState({ activeMapId: this.props.activeMapId });
		}
	}

	onChangeStageBackground = (e): void => {
		this.setState({ onChangeStageBackground: e.target.value } as any);

		if (this.props.updateStageBackground) {
			this.props.updateStageBackground(this.props.activeMapId, e.target.value);
		}
	};

	onChangeDm = (e): void => {
		this.props.setDm(!e.target.checked);
	};

	onChangeActiveMap = (e): void => {
		this.setState({
			activeMapId: e.target.value
		});
	};

	changeMap = (): void => {
		console.log(`Changing Map to ${this.state.activeMapId}`);
		if (this.props.setActiveMap) {
			this.props.setActiveMap(this.state.activeMapId);
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
					{this.props.dm && (
						<div>
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
									<Button
										variant="contained"
										fullWidth
										onClick={this.copyRoomUrl}
									>
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
						</div>
					)}
					{this.props.canBeDm && (
						<div className={styles.settingRow}>
							<FormControlLabel
								control={
									<Switch checked={!this.props.dm} onChange={this.onChangeDm} />
								}
								label="View as Player?"
							/>
						</div>
					)}
					{this.props.dm && (
						<div className={styles.settingRow}>
							<span>Active Map ID {this.props.activeMapId}</span>
							<select
								value={this.state.activeMapId}
								onChange={this.onChangeActiveMap}
							>
								{this.props.maps.map(x => (
									<option key={x.id} value={x.id}>
										{x.id}
									</option>
								))}
							</select>
							<button onClick={this.changeMap}>Change!</button>
							<div>
								Warning: This is still a little buggy! E.g. You need to refresh once
								changed
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}
