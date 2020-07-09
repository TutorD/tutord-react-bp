import {all,  fork, take} from 'redux-saga/effects';

import {
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  onHandleSignUpRequest,
} from './redux';

function* watchUserSignUp(){
  console.log('#watchUserSignUp');
  
  while(true) {
    console.log('#watchUserSignUp while loop');
    const {payload} = yield take(SIGNUP_REQUEST);
    yield fork(onHandleSignUpRequest, payload);
    const action = yield take(SIGNUP_FAILURE);
    
    console.log('maybe a sign up failure happened, not sure... action: ', action);
  }
}

export default function* sagas() {
  yield all([watchUserSignUp()]);
}
