import React, { Component, ReactNode, ReactElement } from 'react';
import { Switch, Route } from 'react-router';
import styles from './App.module.css';

import CharacterSheetContainer from './5e/characterSheet/CharacterSheetContainer';
import ImageUploaderContainer from './sidebar/panels/imageUploader/ImageUploaderContainer';
import Authentication from './authentication/Authentication';
import Sidebar from './sidebar/Sidebar';
import ToolbarContainer from './toolbar/ToolbarContainer';
import ViewControlsContainer from './toolbar/ViewControlsContainer';
import MapContainer from './map/MapContainer';
import { TextField, Button, MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import { Provider } from 'react-redux';
import store, { history } from '../redux/store';
import { ConnectedRouter } from 'connected-react-router';

interface State {
	projectName: string;
	apiKey: string;
}

class App extends Component<{}, State> {
	constructor(props) {
		super(props);
		this.configLoaded = !!localStorage.getItem('firebaseConfig');

		this.state = {
			projectName: '',
			apiKey: ''
		};
	}

	configLoaded: boolean;

	render(): ReactNode {
		const theme = createMuiTheme({
			palette: {
				type: 'dark'
			}
		});

		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<div className="App">
						<MuiThemeProvider theme={theme}>
							<Switch>
								<Route
									exact
									path="/"
									render={(): ReactElement => (
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
												style={{
													position: 'fixed',
													right: '25vw',
													top: '10vh'
												}}
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
								<Route
									path="/upload"
									render={(): ReactElement => <ImageUploaderContainer />}
								/>
								<Route
									path="/login"
									render={(): ReactElement => <Authentication />}
								/>
							</Switch>
						</MuiThemeProvider>
					</div>
				</ConnectedRouter>
			</Provider>
		);
	}
}

export default App;
