import React, { Component, ReactNode } from 'react';
import { Switch, FormControlLabel, Button, Tooltip } from '@material-ui/core';

import styles from './GeneralPanel.module.css';
import { NonPlayerCharacter, CharacterSpell } from '../../../../5e/models/Character';
import { User } from '../../../../models/User';

interface State {
	roomUrlCopiedTooltipOpen: boolean;
	roomUrlTooltipTimeout: any;
	userColour: number;
}

interface Props {
	dm: boolean;
	canBeDm: boolean;
	roomUrl: string;
	currentUser: { user: User; firebaseUser: firebase.User };
	nonPlayerCharacters: NonPlayerCharacter[];
	spells: CharacterSpell[];
	setDm: (val: boolean) => void;
	updateNonPlayerCharacter: (characterId: string, character: NonPlayerCharacter) => void;
	saveNewNonPlayerCharacter: (character: NonPlayerCharacter) => void;
	updateSpell: (spellId: string, spell: CharacterSpell) => void;
	saveNewSpell: (spell: CharacterSpell) => void;
	logout: () => void;
	updateUserColour: (userId: string, colour: number) => void;
}

export default class GeneralPanel extends Component<Props, State> {
	constructor(props) {
		super(props);

		this.onChangeDm = this.onChangeDm.bind(this);
	}

	state = {
		roomUrlCopiedTooltipOpen: false,
		roomUrlTooltipTimeout: null,
		userColour:
			this.props.currentUser && this.props.currentUser.user
				? this.props.currentUser.user.colour
				: 0xff0000
	};

	componentDidUpdate(prevProps, prevState): void {}

	onChangeDm = (e): void => {
		this.props.setDm(!e.target.checked);
	};

	private _hexToInt = (x: string): number => (x ? parseInt(x.replace('#', '0x'), 16) : 0);
	private _intToHex = (x: number): string => `#${(x || 0).toString(16)}`;

	onChangeUserColour = (e): void => {
		const col = this._hexToInt(e.target.value);

		this.setState({
			userColour: col
		});

		this.props.updateUserColour(this.props.currentUser.firebaseUser.uid, col);
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

	importSpells(): void {
		const input = prompt('enter spell json...');
		const obj = JSON.parse(input);
		if (!obj) {
			alert('Failed to parse JSON.');
			return;
		}

		for (const spell of obj) {
			const existing = this.props.spells.find(y => y.name === spell.name);
			if (existing) {
				this.props.updateSpell(existing.id, spell);
			} else {
				this.props.saveNewSpell(spell);
			}
		}

		alert('Done!');
	}

	exportSpells(): void {
		const el = document.createElement('textarea');
		el.value = JSON.stringify(this.props.spells);
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
		alert('Spell JSON copied to clipboard.');
	}

	render(): ReactNode {
		return (
			<div className={styles.generalPanel}>
				<h1>General</h1>
				<div className={styles.settingWrapper}>
					<div className={styles.settingRow}>
						<input
							type="color"
							id="userColour"
							name="userColour"
							onChange={this.onChangeUserColour}
							value={this._intToHex(this.state.userColour)}
							style={{
								margin: '.4rem'
							}}
						/>
						<label
							htmlFor="userColour"
							style={{ font: '1rem "Fira Sans", sans-serif' }}
						>
							User Colour
						</label>
					</div>

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
							<div>
								<Button onClick={() => this.importNpcs()}>Import NPCs</Button>
								<Button onClick={() => this.exportNpcs()}>Export NPCs</Button>
							</div>
							<div>
								<Button onClick={() => this.importSpells()}>Import Spells</Button>
								<Button onClick={() => this.exportSpells()}>Export Spells</Button>
							</div>
						</div>
					)}
					<Button onClick={() => this.props.logout()}>Logout</Button>
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
