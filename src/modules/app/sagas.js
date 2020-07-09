import {all, call, put} from 'redux-saga/effects';

import {initStart, initFinish, initError} from './redux';

import { fetchQuestionSets, signupUser } from '../../api';
import { pending, success, failure } from "./redux/question-sets";

function* getQuestionSets() {
  yield put(pending());
  
  try {
    const res = yield call(fetchQuestionSets);
    yield put(success(res.data));
    
    return { questionSets: res.data };
  } catch(err) {
    // console.error('Error: #getQuestionSets. err:', err);
    yield put(failure(err));
    return { err };
  }
}

function* signUpUser() {

}

function* watchAppInit() {
  yield put(initStart());
  
  try {
    yield call(getQuestionSets);
    yield put(initFinish());
  } catch (err) {
    console.error('Error: Failed to init App Saga, err: ', err);
    yield put(initError(err));
  }
}

export default function* sagas() {
  yield all([watchAppInit()]);
};
