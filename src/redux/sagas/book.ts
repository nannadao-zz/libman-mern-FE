import { select, takeLatest } from 'redux-saga/effects'

function* saveBookState() {
  /* const state = yield select() */
  const book = yield select();
  yield localStorage.setItem('book', JSON.stringify(book))
}

export default [takeLatest('*', saveBookState)]
