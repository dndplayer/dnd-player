import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';

import createRootReducer from './reducers/index';
import rootSaga from './sagas/index';
import { persistStore } from 'redux-persist';

export const history = createBrowserHistory({
	basename: process.env.PUBLIC_URL
});

const sagaMiddleware = createSagaMiddleware();

const enhancers = [];
const middleware = [sagaMiddleware];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeEnhancers(applyMiddleware(...middleware), ...enhancers);

const store = createStore(createRootReducer(history), {}, composedEnhancers);

const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export default { store, persistor };
