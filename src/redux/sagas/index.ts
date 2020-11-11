import { all } from 'redux-saga/effects'

import bookSagas from './book'
/* import userSagas from './user' */

export default function* rootSaga() {
  yield all([...bookSagas])
}
