import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, TextField, Button, createMuiTheme } from '@material-ui/core';

import firebase from 'firebase/app';
import 'firebase/auth';
// import '@firebase/firestore';
import '@firebase/database';

// Error reporting
import * as Sentry from '@sentry/browser';
import ReduxSagaFirebase from 'redux-saga-firebase';

// SENTRYINITHERE

const state = {
	projectId: '',
	apiKey: '',
	username: '',
	password: ''
};

const saveConfig = async (): Promise<void> => {
	const config = {
		apiKey: state.apiKey,
		authDomain: `${state.projectId}.firebaseapp.com`,
		databaseURL: `https://${state.projectId}.firebaseio.com`,
		projectId: state.projectId,
		storageBucket: `${state.projectId}.appspot.com`
	};
	const firebaseApp = firebase.initializeApp(config);

	try {
		const user = await firebaseApp
			.auth()
			.signInWithEmailAndPassword(state.username, state.password);
		localStorage.setItem('firebaseConfig', JSON.stringify(config));

		window.location.replace(window.location.origin);
	} catch (e) {
		alert(`Failed to log in. ${e.message}`);
	} finally {
		firebaseApp.delete();
	}
};

const match = window.location.href.match(/\?projectId=(.*?)&apiKey=(.*)$/);
if (match) {
	state.projectId = match[1];
	state.apiKey = match[2];
}

if (localStorage.getItem('firebaseConfig') == null) {
	const theme = createMuiTheme({
		palette: {
			type: 'dark'
		},
		typography: {
			useNextVariants: true
		}
	});

	ReactDOM.render(
		<div className="App">
			<MuiThemeProvider theme={theme}>
				<div className="projectInputs">
					<TextField
						label="Project Name"
						placeholder="dnd-player-b8372"
						value={state.projectId || undefined}
						disabled={!!state.projectId}
						onChange={evt => (state.projectId = evt.target.value.trim())}
						margin="normal"
					/>
					<TextField
						label="API Key"
						placeholder="AIzaSd***************pK5ao6g95Q-9auWt-8"
						value={state.apiKey || undefined}
						disabled={!!state.apiKey}
						onChange={evt => (state.apiKey = evt.target.value.trim())}
						margin="normal"
					/>
					<TextField
						label="Username"
						placeholder="email@example.com"
						onChange={evt => (state.username = evt.target.value.trim())}
						margin="normal"
					/>
					<TextField
						label="Password"
						type="Password"
						onChange={evt => (state.password = evt.target.value)}
						margin="normal"
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
