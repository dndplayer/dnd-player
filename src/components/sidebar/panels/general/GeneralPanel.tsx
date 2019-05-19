import React, { Component, ReactNode } from 'react';
import { Switch, FormControlLabel, Button, Tooltip } from '@material-ui/core';

import styles from './GeneralPanel.module.css';
import { NonPlayerCharacter } from '../../../../5e/models/Character';
import { MapData } from '../../../../models/Map';

interface State {
	roomUrlCopiedTooltipOpen: boolean;
	roomUrlTooltipTimeout: any;
}

interface Props {
	dm: boolean;
	canBeDm: boolean;
	roomUrl: string;
	nonPlayerCharacters: NonPlayerCharacter[];
	setDm: (val: boolean) => void;
	updateNonPlayerCharacter: (characterId: string, character: NonPlayerCharacter) => void;
	saveNewNonPlayerCharacter: (character: NonPlayerCharacter) => void;
}

export default class GeneralPanel extends Component<Props, State> {
	constructor(props) {
		super(props);

		this.onChangeDm = this.onChangeDm.bind(this);
	}

	state = {
		roomUrlCopiedTooltipOpen: false,
		roomUrlTooltipTimeout: null
	};

	componentDidUpdate(prevProps, prevState): void {}

	onChangeDm = (e): void => {
		this.props.setDm(!e.target.checked);
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
				</div>
			</div>
		);
	}
}
