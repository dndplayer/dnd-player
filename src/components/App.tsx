import React, { Component, ReactNode } from 'react';
import { Switch, Route } from 'react-router';
import styles from './App.module.css';

import ChatContainer from './chat/ChatContainer';
import Map from './map/Map';
import CharacterSheetContainer from './characterSheet/CharacterSheetContainer';
import ImageUploader from './imageUploader/ImageUploader';
import ImageUploaderContainer from './imageUploader/ImageUploaderContainer';
import Authentication from './authentication/Authentication';

class App extends Component<{}> {
	render(): ReactNode {
		return (
			<div className="App">
				<Switch>
					<Route
						exact
						path="/"
						render={() => (
							<div>
								<div>
									<Map updateSpriteLocation={() => {}} />
								</div>
								<div>
									<CharacterSheetContainer />
								</div>
								<div className={styles.chatWrapper}>
									<ChatContainer />
								</div>
							</div>
						)}
					/>
					<Route path="/upload" render={() => <ImageUploaderContainer />} />
					<Route path="/login" render={() => <Authentication />} />
				</Switch>
			</div>
		);
	}
}

export default App;
