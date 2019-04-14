import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers/index';

const enhancers = [];
const middleware = [];

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeEnhancers(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, {}, composedEnhancers);

export default store;
