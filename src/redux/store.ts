import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers/index';
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiddleware();

const enhancers = [];
const middleware = [sagaMiddleware];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeEnhancers(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, {}, composedEnhancers);

sagaMiddleware.run(rootSaga);

export default store;
