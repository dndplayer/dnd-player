import React, { Component, ReactNode, SyntheticEvent } from 'react';
import { Switch, FormControlLabel } from '@material-ui/core';

interface State {
	stageBackground: string;
}

interface Props {
	stageBackground: string;
	updateStageBackground: (value: string) => void;
}

export default class GeneralPanel extends Component<Props, State> {
	state = {
		stageBackground: this.props.stageBackground || '#ffffff'
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.stageBackground !== this.props.stageBackground) {
			this.setState({ stageBackground: this.props.stageBackground });
		}
	}

	handleChange = (name: string) => e => {
		this.setState({ [name]: e.target.value } as any);

		if (name === 'stageBackground') {
			if (this.props.updateStageBackground) {
				this.props.updateStageBackground(e.target.value);
			}
		}
	};

	render(): ReactNode {
		return (
			<div>
				<h1>General</h1>

				<h2>TODO:</h2>
				<ul>
					<li>Room URL copy button</li>
					<li>Logout button</li>
				</ul>

				<div>
					<input
						type="color"
						id="stageBackground"
						name="stageBackground"
						onChange={this.handleChange('stageBackground')}
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

				<FormControlLabel control={<Switch />} label="Is DM?" />
			</div>
		);
	}
}
