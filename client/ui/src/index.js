// require('style!bootstrap/less/bootstrap.less');
require('style-loader!./styles/style.less');
//require('file-loader?name=[name].[ext]!./index.html');

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
import App from './App';

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer, undefined, composeEnhancers(
    applyMiddleware(logger)
));
/* eslint-enable */

// store.subscribe(function() {
//   console.log('LOG: store has been updated. Latest store state:', store.getState());
// });

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('container')
);
