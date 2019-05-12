import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';

import createRootReducer from './reducers/index';
import rootSaga from './sagas/index';
import { persistentStore } from 'redux-pouchdb';
import PouchDB from 'pouchdb-browser';

export const history = createBrowserHistory({
	basename: process.env.PUBLIC_URL
});

const db = new PouchDB('dnd-player');
const sagaMiddleware = createSagaMiddleware();

const enhancers = [persistentStore(db)];
const middleware = [sagaMiddleware];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeEnhancers(applyMiddleware(...middleware), ...enhancers);

const store = createStore(createRootReducer(history), {}, composedEnhancers);

sagaMiddleware.run(rootSaga);

export default store;
