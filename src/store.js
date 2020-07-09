import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import reduxThunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import createReduxPromiseListener from 'redux-promise-listener';

import rootReducer from './modules/rootReducer';
import sagas, {logActions} from './modules/rootSagas';

const sagaMiddleware = createSagaMiddleware();
const reduxPromiseListener = createReduxPromiseListener();

let basename = '/';
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export let history = createBrowserHistory({basename});
let middleware = [
  sagaMiddleware,
  reduxThunk,
  reduxPromiseListener.middleware,
  routerMiddleware(history),
];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

let store = createStore(
  rootReducer(history),
  /* preloadedState, */ composeEnhancers(
    applyMiddleware(...middleware)
  ));
/* eslint-enable */

export const promiseListener = reduxPromiseListener; // <---------- ⚠️ IMPORTANT ⚠️

sagaMiddleware.run(logActions);
sagaMiddleware.run(sagas);

export default store;
export let dispatch = store.dispatch;
