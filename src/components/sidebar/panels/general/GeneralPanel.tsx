import React, { Component } from 'react';

export default class GeneralPanel extends Component {
	render() {
		return (
			<div>
				<h1>General</h1>

				<h2>TODO:</h2>
				<ul>
					<li>Map stage background colour</li>
					<li>Room URL copy button</li>
					<li>Logout button</li>
				</ul>

				<div>
					<input
						type="color"
						id="stageBackground"
						name="stageBackground"
						value="#ffffff"
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
			</div>
		);
	}
}
