import { select, takeLatest } from 'redux-saga/effects'
import * as selectors from './selectors';

function* saveUserState() {
  /* const state = yield select() */
  const user = yield select(selectors.user);
  yield localStorage.setItem('user', JSON.stringify(user))
}

export default [takeLatest('*', saveUserState)]
