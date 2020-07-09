import {combineReducers} from 'redux';

export const APP_INIT_START = 'app/init/START';
export const APP_INIT_FINISHED = 'app/init/FINISHED';
export const APP_INIT_ERROR = 'app/init/ERROR';

export const initStart = () => ({
  type: APP_INIT_START,
});

export const initFinish = () => ({
  type: APP_INIT_FINISHED,
});

export const initError = (error) => ({
  type: APP_INIT_ERROR,
  payload: error,
  error: true,
});

const INITIAL_STATE = {
  isLoading: false,
  didInit: false,
  error: null,
};

let session = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APP_INIT_START:
      return {...state, isLoading: true};
    case APP_INIT_FINISHED:
      return {...state, isLoading: false, didInit: true};
    case APP_INIT_ERROR:
      return {...state, isLoading: false, error: action.payload};
    default:
      return state;
  }
};

const appStore = combineReducers({
  session,
});

export default appStore;
