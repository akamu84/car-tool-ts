import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { carToolReducer } from './reducers/carToolReducers';

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  carTool: carToolReducer,
});

export const carToolStore = createStore(
  // one top-level reducer is passed in, other reducers
  // can be called from within the top-level reducer
  rootReducer,
  // middleware is extra code added to the action
  // pipeline
  // for example: thunk - action which are dispatched into
  // redux must be plain objects with a type property
  // however, for asynchronous operations we are dispatching
  // functions into Redux
  // thunk is middleware which intercepts the functions (preventing
  // them from being handled by redux, invoked the functions
  // passing the dispatch function, then the invoked function
  // will dispatch normal actions for the request and done parts
  // of the asychronous operation
  composeWithDevTools(applyMiddleware(thunk))
);
