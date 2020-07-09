import {all, call, put} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import request from '../../../lib/request';
import {FORM_ERROR} from 'final-form';

export const SIGNIN_REQUEST = 'auth/signin/SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'auth/signin/SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'auth/signin/SIGNIN_FAILURE';
export const SIGNIN_CANCELLED = 'auth/signin/SIGNIN_CANCELLED';

export const SIGNOUT_REQUEST = 'auth/signout/SIGNOUT_REQUEST';
export const SIGNOUT_SUCCESS = 'auth/signout/SIGNOUT_SUCCESS';

export const AUTHENTICATED = 'auth/signin/AUTHENTICATED';
export const UNAUTHENTICATED = 'auth/signin/UNAUTHENTICATED';

export const SET_TOKEN = 'auth/login/SET_TOKEN';
export const UNSET_TOKEN = 'auth/login/UNSET_TOKEN';

let user =
  localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : '';

const INITIAL_STATE = user
  ? {
    authenticated: true,
    user: user,
    token: null,
    isLoading: false,
    error: null,
  }
  : {
    user: null,
    token: null,
    authenticated: false,
    isLoading: false,
    error: null,
  };

export const handleSignInSuccess = payload => ({
  type: SIGNIN_SUCCESS,
  payload,
});

export const handleSignOutRequest = () => ({
  type: SIGNOUT_REQUEST,
  user: null,
  token: null,
});

export const setAuthToken = payload => ({
  type: SET_TOKEN,
  payload,
});

export const unsetAuthToken = () => ({
  type: UNSET_TOKEN,
});

export function* onHandleSignInRequest({email, password}) {
  console.log('#onHandleSignInRequest');
  try {
    console.log('#onHandleSignInRequest, email: %s, password: %s', email, password);
    const response = yield call(request.post, '/auth/login', {email, password});
    
    const { user, token } = response.data;
    
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(user));
    yield all([
      put(handleSignInSuccess(user)),
      put(setAuthToken(token)),
      put(push('/teacher/dashboard')),
    ]);
  } catch (err) {
    console.error('#onHandleSignInRequest, catch block, err: ', err);
    if (err.message === 'Network Error') {
      yield put({
        type: SIGNIN_SUCCESS,
        payload: {[FORM_ERROR]: 'Check your connection and please try again later.'},
      });
    } else {
      console.error('#onHandleSignInRequest catch block, err: ', err);
      yield put({type: SIGNIN_SUCCESS, payload: {[FORM_ERROR]: 'Login Failed'}});
    }
    console.error('#onHandleSignInRequest catch block, err: ', err);
    yield put({type: SIGNIN_SUCCESS, payload: {[FORM_ERROR]: 'Login Failed'}});
  }
}

export function* onHandleSignOutRequest() {
  console.log('#onHandleSignOutRequest');
  try {
    console.log('#onHandleSignOutRequest, try block');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    yield all([
      put(handleSignOutRequest()),
      put(unsetAuthToken()),
      put(push('/')),
    ]);
  } catch (err) {
    console.error('#onHandleSignOutRequest, err: ', err);
  }
}

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return {...state, isLoading: true, authenticated: false};
    case SIGNIN_SUCCESS:
      return {...state, isLoading: false, authenticated: true, user: action.payload};
    case SIGNIN_FAILURE:
      return {...state, isLoading: false, authenticated: false, error: action.payload};
    case SET_TOKEN:
      return {...state, token: action.payload};
    case UNSET_TOKEN:
      return {...state, token: action.payload};
    case AUTHENTICATED:
      return {...state, authenticated: true};
    case UNAUTHENTICATED:
      return {...state, authenticated: false};
    default:
      return state;
  }
}
