import React from 'react';
import ReactDOM from 'react-dom';
import {
  compose,
  combineReducers,
  createStore,
  applyMiddleware,
} from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import App from './App';
import rootReducer from './rootReducer';

declare global {
  // tslint:disable-next-line
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
    gapi: any;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers(rootReducer);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
