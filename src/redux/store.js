import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import authreducer from './reducers/authReducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  authreducer,
  composeEnhancers(applyMiddleware(thunk))
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;