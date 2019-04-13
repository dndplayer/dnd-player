import React, { Component, ReactNode } from 'react';
import './App.css';
// import firebase from 'firebase/app';
import 'firebase/firestore';
// import FirebaseConfig from './firebase-config.json';

import Chat from './chat/Chat';

class App extends Component<{}> {
	render(): ReactNode {
		return (
			<div className="App">
				<div className="chatWrapper">
					<h1 className="chatHeader">Chat</h1>
					<Chat />
				</div>
			</div>
		);
	}
}

export default App;
