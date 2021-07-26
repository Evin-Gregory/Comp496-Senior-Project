import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';

import store from './redux/store';
import App from './App';

import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api/v1";

// const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose 
// const store = createStore(reducers, composeEnhances(
  // applyMiddleware(thunk)
// ));

const app = (
  <Provider store={store}>
      <App />
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
