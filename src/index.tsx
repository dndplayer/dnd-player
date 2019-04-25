import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, TextField, Button, createMuiTheme } from '@material-ui/core';

const state = {
	projectName: '',
	apiKey: ''
};

const saveConfig = (): void => {
	localStorage.setItem(
		'firebaseConfig',
		JSON.stringify({
			apiKey: state.apiKey,
			authDomain: `${state.projectName}.firebaseapp.com`,
			databaseURL: `https://${state.projectName}.firebaseio.com`,
			projectId: state.projectName,
			storageBucket: `${state.projectName}.appspot.com`
		})
	);

	window.location.replace(window.location.origin);
};

const match = window.location.pathname.match(/room\/(.*?);(.*)$/);
if (match) {
	state.projectName = match[1];
	state.apiKey = match[2];
	saveConfig();
} else if (localStorage.getItem('firebaseConfig') == null) {
	const theme = createMuiTheme({
		palette: {
			type: 'dark'
		}
	});

	ReactDOM.render(
		<div className="App">
			<MuiThemeProvider theme={theme}>
				<div className="projectInputs">
					<TextField
						label="Project Name"
						placeholder="dnd-player-b8372"
						onChange={evt => (state.projectName = evt.target.value)}
						margin="normal"
					/>
					<TextField
						label="API Key"
						placeholder="AIzaSd***************pK5ao6g95Q-9auWt-8"
						onChange={evt => (state.apiKey = evt.target.value)}
						margin="normal"
						onKeyUp={event => {
							event.keyCode === 13 && this.saveConfig(); // Quick save on enter if API box is focused.
						}}
					/>
					<Button variant="contained" color="primary" onClick={() => saveConfig()}>
						Save
					</Button>
				</div>
			</MuiThemeProvider>
		</div>,
		document.getElementById('root')
	);
} else {
	const App = require('./components/App').default;
	ReactDOM.render(<App />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
