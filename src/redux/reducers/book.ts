import {
  BOOK_LIST_REQUESTED,
  BOOK_LIST_SUCCEED,
  BOOK_LIST_FAILED,
  BOOK_QUERY_REQUESTED,
  BOOK_QUERY_SUCCEED,
  BOOK_QUERY_FAILED,
  EDIT_BOOK_REQUESTED,
  EDIT_BOOK_SUCCEED,
  EDIT_BOOK_FAILED,
  CREATE_BOOK_SUCCEED,
  CREATE_BOOK_FAILED,
  DELETE_BOOK_REQUESTED,
  DELETE_BOOK_SUCCEED,
  DELETE_BOOK_FAILED,
  BORROW_BOOK_REQUESTED,
  BORROW_BOOK_SUCCEED,
  BORROW_BOOK_FAILED,
  RETURN_BOOK_REQUESTED,
  RETURN_BOOK_SUCCEED,
  RETURN_BOOK_FAILED,
  HIDE_MESSAGE,
  FetchBookActions,
  BookState,
  BookResponse,
} from '../../types'

export default function book(
  state: BookState = {
    loading: true,
    allBooks: [],
    errors: [],
    filteredBooks: [],
    response: [],
    message: '',
    status: ''
  },
  action: FetchBookActions
): BookState {
  switch (action.type) {
    case BOOK_LIST_REQUESTED:
      return {
        ...state,
        loading: true,
      }
    case BOOK_LIST_SUCCEED:
      const books = action.payload
      return {
        ...state,
        loading: false,
        allBooks: books,
        errors: [],
        filteredBooks: books,
      }
    case BOOK_LIST_FAILED:
      const error = action.payload
      return {
        ...state,
        errors: [...state.errors, error],
      }
    case BOOK_QUERY_REQUESTED:
      return {
        ...state,
        loading: true,
      }
    case BOOK_QUERY_SUCCEED:
      const filteredBooks = action.payload
      return {
        ...state,
        loading: false,
        errors: [],
        filteredBooks: filteredBooks,
      }
    case BOOK_QUERY_FAILED:
      const error2 = action.payload
      return {
        ...state,
        errors: [...state.errors, error2],
      }
    case EDIT_BOOK_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case EDIT_BOOK_SUCCEED:
      const editResponse = action.payload
      return {
        ...state,
        loading: false,
        status: editResponse.status,
        message: editResponse.message
      }
    case EDIT_BOOK_FAILED:
      const editError = action.payload
      return {
        ...state,
        loading: false,
        status: editError.status,
        message: editError.message
      }
    case CREATE_BOOK_SUCCEED:
      const createResponse = action.payload
      return {
        ...state,
        loading: false,
        status: createResponse.status,
        message: createResponse.message
      }
    case CREATE_BOOK_FAILED:
      const createError = action.payload
      return {
        ...state,
        loading: false,
        status: createError.status,
        message: createError.message
      }
    case DELETE_BOOK_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case DELETE_BOOK_SUCCEED:
      const { data, bookId } = action.payload
      let newList = state.allBooks.filter(
        (item: BookResponse) => item._id !== bookId
      )
      return {
        ...state,
        loading: false,
        allBooks: newList,
        status: data.status,
        message: data.message
      }
    case DELETE_BOOK_FAILED:
      const deleteError = action.payload
      return {
        ...state,
        loading: false,
        status: deleteError.status,
        message: deleteError.message
      }
    case BORROW_BOOK_REQUESTED:
      return {
        ...state,
        loading: true,
      }
    case BORROW_BOOK_SUCCEED:
      const borrowResponse = action.payload
      let newBookList = state.allBooks
      let borrowedBookIndex = newBookList.findIndex((item: BookResponse) => JSON.stringify(item._id) ===  JSON.stringify(borrowResponse.book._id))
      newBookList[borrowedBookIndex].borrowers = borrowResponse.book.borrowers
      return {
        ...state,
        loading: false,
        allBooks: newBookList,
        status: borrowResponse.status,
        message: borrowResponse.message
      }
    case BORROW_BOOK_FAILED:
      const borrowError = action.payload
      return {
        ...state,
        loading: false,
        status: borrowError.status,
        message: borrowError.message
      } 
    case RETURN_BOOK_REQUESTED: 
      return {
        ...state,
        loading: true
      }
    case RETURN_BOOK_SUCCEED:
      const returnResponse = action.payload
      let updatedBookList = state.allBooks
      let returnedBookIndex = updatedBookList.findIndex((item: BookResponse) => JSON.stringify(item._id) === JSON.stringify(returnResponse.book._id))
      updatedBookList[returnedBookIndex].borrowers = returnResponse.book.borrowers
      return {
        ...state,
        loading: false,
        allBooks: updatedBookList,
        status: returnResponse.status,
        message: returnResponse.message
      }
    case RETURN_BOOK_FAILED:
      const returnError = action.payload
      return {
        ...state,
        loading: false,
        status: returnError.status,
        message: returnError.message
      }
    case HIDE_MESSAGE:
      return {
        ...state,
        message: '',
        status: ''
      }
    default:
      return state
  }
}