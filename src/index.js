import React from 'react';
import ReactDOM from 'react-dom';

import 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import configureStore from './store/configureStore';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(
  <MuiThemeProvider >
    <Provider store={store} >
      <App />
    </Provider>
  </MuiThemeProvider >,
  document.getElementById('root'));
registerServiceWorker();
