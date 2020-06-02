import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {combineReducers,compose,createStore,applyMiddleware} from 'redux';
import {BrowserRouter} from 'react-router-dom';
 import DashboardReducer from "./store/reducers/Dashboard";
 import CountryStatsReducer from "./store/reducers/CountryStats";
import thunk from 'redux-thunk';
import fetchIntercept from 'fetch-intercept';

const unregister = fetchIntercept.register({
  request: function (url, config) {
      // Modify the url or config here
      if(config && config.method==="POST"){
          config.headers={'Content-Type':'application/json'}
      }
      return [url, config];
  },

  requestError: function (error) {
      // Called when an error occured during another 'request' interceptor call
      return Promise.reject(error);
  },

  response: function (response) {
      // Modify the reponse object
      console.log(response);
      return response;
  },

  responseError: function (error) {
      // Handle an fetch error
      console.log(error);
      return Promise.reject(error);
  }
});

const composeEnhancers = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer=combineReducers({
  dboard:DashboardReducer,
  stats:CountryStatsReducer
})
const store=createStore(reducer,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="world_covid19">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
