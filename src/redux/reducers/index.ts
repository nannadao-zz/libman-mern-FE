import { combineReducers } from 'redux'

import book from './book'
import user from './user'

const createRootReducer = () =>
  combineReducers({
    book,
    user
  })

export default createRootReducer