import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { NonPlayerCharacter } from '../../5e/models/Character';

interface Props {
	loggedIn: boolean;
	logout: () => void;
	nonPlayerCharacters: NonPlayerCharacter[];
	updateNonPlayerCharacter: (characterId: string, character: NonPlayerCharacter) => void;
	saveNewNonPlayerCharacter: (character: NonPlayerCharacter) => void;
}
export default class Settings extends Component<Props> {
	copyRoomUrl(): void {
		const el = document.createElement('textarea');
		const settings = JSON.parse(localStorage.getItem('firebaseConfig'));
		el.value = document.location + `?projectId=${settings.projectId}&apiKey=${settings.apiKey}`;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
	}

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

	render() {
		return (
			<div className="column">
				<h1>Settings</h1>
				<Button onClick={this.copyRoomUrl}>Copy Room URL</Button>
				<Button onClick={() => this.importNpcs()}>Import NPCs</Button>
				<Button onClick={() => this.exportNpcs()}>Export NPCs</Button>
				{this.props.loggedIn && (
					<Button variant="contained" color="primary" onClick={this.props.logout}>
						Logout
					</Button>
				)}
			</div>
		);
	}
}
