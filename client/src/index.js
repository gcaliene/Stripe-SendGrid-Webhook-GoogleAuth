//this file contains the bootup logic aka the data layer control, it really all about (redux)
//import materializeCSS from 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk)); //createStore first argument is a reducer, 2nd arg is

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

console.log('STRIPE KEY IS = ', process.env.REACT_APP_STRIPE_KEY);
console.log('ENVIRONMENT IS:', process.env.NODE_ENV); //SHOULD EQUAL DEVELOPMENT
