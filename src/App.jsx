import React from 'react';
import './App.css';
import GlobalStyle from 'styled-components';
import Router from './shared/Router';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Router>
        <Home />
        <GlobalStyle />
      </Router>
    </>
  );
}

export default App;
