require('file?name=[name].[ext]!./index.html');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore  } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
import ContactsDashboard from './containers/ContactsDashboard';

let store = createStore(rootReducer, window.devToolsExtension && window.devToolsExtension());

store.subscribe(function() {
  console.log('LOG: store has been updated. Latest store state:', store.getState());
});

ReactDOM.render(
    <Provider store={store}>
      <ContactsDashboard />
    </Provider>,
    document.getElementById('container')
);
