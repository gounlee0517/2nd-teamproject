import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './GlobalStyle';

import { Provider } from 'react-redux';
import store from './redux/config/configStore.js';

import app from './firebase';

// console.log('app', app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
    <GlobalStyle />
  </Provider>
);
