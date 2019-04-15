import React, { Component, ReactNode } from 'react';
import { Switch, Route } from 'react-router';
import './App.css';

import ChatContainer from './chat/ChatContainer';
import Map from './map/Map';

class App extends Component<{}> {
	render(): ReactNode {
		return (
			<div className="App">
				<Switch>
					<Route
						render={() => (
							<div>
								<div>
									<Map updateSpriteLocation={() => {}} />
								</div>
								<div className="chatWrapper">
									<h1 className="chatHeader">Chat</h1>
									<ChatContainer />
								</div>
							</div>
						)}
					/>
				</Switch>
			</div>
		);
	}
}

export default App;
