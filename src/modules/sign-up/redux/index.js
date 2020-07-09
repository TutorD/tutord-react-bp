import {all, call, put} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import request from '../../../lib/request';
import {FORM_ERROR} from 'final-form';
import { setAuthToken } from '../../auth/redux';

export const SIGNUP_REQUEST = 'sign-up/sign-up/SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'sign-up/sign-up/SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'sign-up/sign-up/SIGNUP_FAILURE';
export const SIGNUP_CANCELLED = 'sign-up/sign-up/SIGNUP_CANCELLED';

export const VERIFY_EMAIL_REQUEST = 'sign-up/sign-up/VERIFY_EMAIL_REQUEST';
export const VERIFY_EMAIL_SUCCESS = 'sign-up/sign-up/VERIFY_EMAIL_SUCCESS';
export const VERIFY_EMAIL_FAILURE = 'sign-up/sign-up/VERIFY_EMAIL_FAILURE';

export const RESEND_EMAIL_REQUEST = 'sign-up/sign-up/RESEND_EMAIL_REQUEST';
export const RESEND_EMAIL_SUCCESS = 'sign-up/sign-up/RESEND_EMAIL_SUCCESS';
export const RESEND_EMAIL_FAILURE = 'sign-up/sign-up/RESEND_EMAIL_FAILURE';

export const handleSignUpSuccess = payload => ({
  type: SIGNUP_SUCCESS,
  payload,
});

export const handleVerifyEmailSuccess = payload => ({
  type: VERIFY_EMAIL_SUCCESS,
  payload,
});

export const handleVerifyEmail = payload => ({
  type: VERIFY_EMAIL_REQUEST,
  payload,
});

export function* onHandleSignUpRequest({firstName, lastName, email, orgName='', password}) {
  console.log('#onHandleSignUpRequest: ', firstName, lastName, email, orgName, password);
  try {
    const response = yield call(request.post, '/accounts/create', {firstName, lastName, email, orgName, password});
    
    console.log('response: ', response);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    yield all([
      put(handleSignUpSuccess(response.data.user)),
      put(push('/verify/email-sent'))
    ]);
  } catch (err) {
    console.error('#onHandleSignUpRequest, err: ', err);
    
    if (err.response.status === 422) {
      yield put({
        type: SIGNUP_SUCCESS,
        payload: {[FORM_ERROR]: err.response.data.message,
          ...err.response.data.errors
        },
      });
    }
    
    if (err.message === 'Network Error') {
      yield put({
        type: SIGNUP_SUCCESS,
        payload: {[FORM_ERROR]: 'Check your connection and please try again later.'},
      });
    }
    
    if (err.response.status === 500) {
      yield put({
        type: SIGNUP_FAILURE,
        payload: {[FORM_ERROR]: 'Its not you, its us....... Please try again later.'},
      });
    }
  }
}

export function* onHandleVerifyEmail({emailToken}) {
  console.log('#onHandleVerifyEmail, emailToken: ', emailToken);
  try {
    console.log('#onHandleVerifyEmail, try block');
    const response = yield call(request.post, '/verify/email', {emailToken});
  
    console.log('response: ', response);
    localStorage.setItem('token', JSON.stringify(response.data.token));
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    yield all([
      put(handleVerifyEmailSuccess(response.data.user)),
      put(setAuthToken(response.data.token)),
      put(push('/on-boarding/0'))
    ]);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  } catch (err) {
    console.error('#onHandleVerifyEmail, catch block, err: ', err);
  }
}

const INITIAL_STATE = {
  isLoading: false,
  user: null,
  error: null,
  emailToken: null
};

export default function signUp(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case VERIFY_EMAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        emailToken: action.payload
      };
    case SIGNUP_SUCCESS:
    case VERIFY_EMAIL_SUCCESS:
      console.log('action.payload: ', action.payload);
      return {
        ...state,
        isLoading: false,
        user: action.payload
      };
    case SIGNUP_FAILURE:
    case VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: action.payload.errors
      };
    case RESEND_EMAIL_REQUEST:
      console.log('RESEND_EMAIL_REQUEST, action.payload: ', action.payload);
      return {
        ...state,
        isLoading: true,
      };
    case RESEND_EMAIL_SUCCESS:
      console.log('RESEND_EMAIL_SUCCESS, action.payload: ', action.payload);
      return {
        ...state,
        isLoading: false,
        user: action.payload
      };
    case RESEND_EMAIL_FAILURE:
      console.log('RESEND_EMAIL_FAILURE, action.payload: ', action.payload);
      return {
        ...state,
        isLoading: false,
        errors: action.payload.errors
      };
    default:
      return state;
  }
}
