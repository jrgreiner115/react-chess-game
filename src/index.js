import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {ActionCableProvider} from 'react-actioncable-provider'

ReactDOM.render(
  <ActionCableProvider url={'ws://localhost3001/cable'}>
    <App />
  </ActionCableProvider>
  , document.getElementById('root'));
registerServiceWorker();
