import React, { Component, ReactNode, ReactElement } from 'react';
import { Switch, Route } from 'react-router';
import styles from './App.module.css';
import { HashRouter } from 'react-router-dom';

import CharacterSheetContainer from '../5e/components/characterSheet/CharacterSheetContainer';
import ImageUploaderContainer from './sidebar/panels/imageUploader/ImageUploaderContainer';
import Authentication from './authentication/Authentication';
import Sidebar from './sidebar/Sidebar';
import MapContainer from './map/MapContainer';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import { Provider } from 'react-redux';
import store, { history } from '../redux/store';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PropertiesPanelContainer from './propertiesPanel/PropertiesPanelContainer';
import ChatContainer from './chat/ChatContainer';
// import OverlayTab from './sidebar/panels/overlays/OverlayTab';
// import UploadOverlayContainer from './sidebar/panels/overlays/UploadOverlayContainer';

interface State {
	projectName: string;
	apiKey: string;
}

export class App extends Component<{}, State> {
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
				<HashRouter>
					<DragDropContextProvider backend={HTML5Backend}>
						<div className="App">
							<MuiThemeProvider theme={theme}>
								<Switch>
									<Route
										exact
										path="/"
										render={(): ReactElement => (
											<div>
												{/* <OverlayTab name="Uploads">
													<UploadOverlayContainer />
												</OverlayTab> */}
												<div className={styles.overlayWrapper}>
													<div
														style={{
															zIndex: 9999,
															position: 'absolute',
															bottom: 0,
															left: 0,
															backgroundColor:
																'rgba(255,255,255, 0.4)',
															padding: '10px',
															width: '30vw'
														}}
													>
														<ChatContainer />
													</div>
												</div>
												<div className={styles.mapWrapper}>
													<PropertiesPanelContainer />
													<MapContainer />
												</div>
												{/* <div className={styles.chatWrapper}>
													<Sidebar />
												</div> */}
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
									<Route
										path="/characterSheet/:id"
										render={(props): ReactElement => (
											<CharacterSheetContainer
												popout={props.match.params.id}
												{...props}
											/>
										)}
									/>
								</Switch>
							</MuiThemeProvider>
						</div>
					</DragDropContextProvider>
				</HashRouter>
			</Provider>
		);
	}
}

export default App;
