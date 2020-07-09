import { combineReducers } from 'redux';
import { connectRouter } from "connected-react-router";

import app from './app/redux';
import auth from './auth/redux'
import signUp from './sign-up/redux';

const rootReducer = (history) => (
  combineReducers({
    app,
    auth,
    signUp,
    router: connectRouter(history)
  })
);

export default rootReducer;
