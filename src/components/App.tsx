import React, { Component, ReactNode } from 'react';
import { Switch, Route } from 'react-router';
import styles from './App.module.css';

import ChatContainer from './chat/ChatContainer';
import CharacterSheetContainer from './5e/characterSheet/CharacterSheetContainer';
import ImageUploader from './sidebar/panels/imageUploader/ImageUploader';
import ImageUploaderContainer from './sidebar/panels/imageUploader/ImageUploaderContainer';
import Authentication from './authentication/Authentication';
import Sidebar from './sidebar/Sidebar';
import ToolbarContainer from './toolbar/ToolbarContainer';
import ViewControlsContainer from './toolbar/ViewControlsContainer';
import MapContainer from './map/MapContainer';

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
								<MapContainer />
								<ToolbarContainer
									style={{
										position: 'fixed',
										bottom: '0',
										left: '35%',
										transform: 'translate(-50%, 0%)'
									}}
								/>
								<ViewControlsContainer
									style={{ position: 'fixed', right: '25vw', top: '10vh' }}
								/>
								<div>
									<CharacterSheetContainer />
								</div>
								<div className={styles.chatWrapper}>
									<Sidebar />
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
