import React, { Component, ReactNode } from 'react';
import './App.css';

import ChatContainer from './chat/ChatContainer';

class App extends Component<{}> {
	render(): ReactNode {
		return (
			<div className="App">
				<div className="chatWrapper">
					<h1 className="chatHeader">Chat</h1>
					<ChatContainer />
				</div>
			</div>
		);
	}
}

export default App;
