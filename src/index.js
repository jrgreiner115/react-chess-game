import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ActionCableProvider } from 'react-actioncable-provider'
import {BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <ActionCableProvider url={'ws://localhost:3001/cable'}>
    <Router>
      <App />
    </Router>
  </ActionCableProvider>
  , document.getElementById('root'));
registerServiceWorker();
