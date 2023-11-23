//index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import auth from './firebase';
import { Provider } from 'react-redux';
import store from './redux/config/configStore';
import GlobalStyle from './GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <GlobalStyle />
    </React.StrictMode>
  </Provider>
);
