import React, { Component, ReactNode, ReactElement } from 'react';
import { Switch, Route } from 'react-router';
import styles from './App.module.css';
import { HashRouter } from 'react-router-dom';

import CharacterSheetContainer from '../5e/components/characterSheet/CharacterSheetContainer';
import ImageUploaderContainer from './sidebar/panels/imageUploader/ImageUploaderContainer';
import Authentication from './authentication/Authentication';
import MapContainer from './map/MapContainer';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import { Provider } from 'react-redux';
import store from '../redux/store';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PropertiesPanelContainer from './propertiesPanel/PropertiesPanelContainer';
import ChatContainer from './chat/ChatContainer';
import OverlayTabsContainer from './sidebar/OverlayTabsContainer';
import { PersistGate } from 'redux-persist/integration/react';
import { HotKeys } from 'react-hotkeys';

const keyMap = {
	OPEN_CHAT: 'enter',
	CLOSE_CHAT: 'esc'
};

const handlers = {
	OPEN_CHAT: event => console.log('enter pressed'),
	CLOSE_CHAT: event => console.log('esc pressed')
};

export class App extends Component<{}, {}> {
	render(): ReactNode {
		const theme = createMuiTheme({
			palette: {
				type: 'dark'
			}
		});

		return (
			<Provider store={store.store}>
				<PersistGate persistor={store.persistor}>
					<HashRouter>
						<DragDropContextProvider backend={HTML5Backend}>
							<div className="App">
								<HotKeys keyMap={keyMap} handlers={handlers}>
									<MuiThemeProvider theme={theme}>
										<Switch>
											<Route
												exact
												path="/"
												render={(): ReactElement => (
													<div>
														<OverlayTabsContainer />
														<div className={styles.overlayWrapper}>
															<ChatContainer />
														</div>
														<div className={styles.mapWrapper}>
															<PropertiesPanelContainer />
															<MapContainer />
														</div>
														<div>
															<CharacterSheetContainer
																{...this.props}
															/>
														</div>
													</div>
												)}
											/>
											<Route
												path="/upload"
												render={(): ReactElement => (
													<ImageUploaderContainer />
												)}
											/>
											<Route
												path="/login"
												render={(): ReactElement => <Authentication />}
											/>
										</Switch>
									</MuiThemeProvider>
								</HotKeys>
							</div>
						</DragDropContextProvider>
					</HashRouter>
				</PersistGate>
			</Provider>
		);
	}
}

export default App;
