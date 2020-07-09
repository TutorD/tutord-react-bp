import {all, call, cancel, fork, take} from 'redux-saga/effects';

import {
  SIGNIN_REQUEST,
  onHandleSignInRequest,
  SIGNOUT_REQUEST,
  onHandleSignOutRequest,
} from './redux';

function* watchUserAuthentication() {
  console.log('#watchUserAuthentication');
  
  while (true) {
    console.log('#watchUserAuthentication while loop');
    const {payload} = yield take(SIGNIN_REQUEST);
    const task = yield fork(onHandleSignInRequest, payload);
    const action = yield take([SIGNOUT_REQUEST]);
    console.log('and now we wait');
    if (action.type === SIGNOUT_REQUEST) {
      console.log('#watchUserAuthentication, Signout Request');
      yield cancel(task);
      yield call(onHandleSignOutRequest);
    }
  }
}

export default function* sagas() {
  yield all([watchUserAuthentication()]);
}
