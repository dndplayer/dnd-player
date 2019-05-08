import React, { Component, ReactNode, SyntheticEvent } from 'react';
import { Switch, FormControlLabel } from '@material-ui/core';

interface State {
	stageBackground: string;
	isDm: boolean;
}

interface Props {
	stageBackground: string;
	isDm: boolean;
	updateStageBackground: (value: string) => void;
	setIsDm: (val: boolean) => void;
}

export default class GeneralPanel extends Component<Props, State> {
	constructor(props) {
		super(props);

		this.onChangeStageBackground = this.onChangeStageBackground.bind(this);
		this.onChangeIsDm = this.onChangeIsDm.bind(this);
	}

	state = {
		isDm: this.props.isDm,
		stageBackground: this.props.stageBackground || '#ffffff'
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.stageBackground !== this.props.stageBackground) {
			this.setState({ stageBackground: this.props.stageBackground });
		}
	}

	onChangeStageBackground = e => {
		this.setState({ onChangeStageBackground: e.target.value } as any);

		if (this.props.updateStageBackground) {
			this.props.updateStageBackground(e.target.value);
		}
	};

	onChangeIsDm = e => {
		this.setState({ isDm: !!e.target.checked });

		if (this.props.setIsDm) {
			this.props.setIsDm(!!e.target.checked);
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

				<FormControlLabel
					control={<Switch value={this.state.isDm} onChange={this.onChangeIsDm} />}
					label="Is DM?"
				/>
			</div>
		);
	}
}
