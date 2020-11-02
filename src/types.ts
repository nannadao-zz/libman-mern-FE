// ========  //
//  ACTIONS  //
// ========  //

export const BOOK_LIST_REQUESTED = 'BOOK_LIST_REQUESTED'
export const BOOK_LIST_SUCCEED = 'BOOK_LIST_SUCCEED'
export const BOOK_LIST_FAILED = 'BOOK_LIST_FAILED'
export const BOOK_QUERY_REQUESTED = 'BOOK_QUERY_REQUESTED'
export const BOOK_QUERY_SUCCEED = 'BOOK_QUERY_SUCCEED'
export const BOOK_QUERY_FAILED = 'BOOK_QUERY_FAILED'
export const EDIT_BOOK_REQUESTED = 'EDIT_BOOK_REQUESTED'
export const EDIT_BOOK_SUCCEED = 'EDIT_BOOK_SUCCEED'
export const EDIT_BOOK_FAILED = 'EDIT_BOOK_FAILED'
export const CREATE_BOOK_SUCCEED = 'CREATE_BOOK_SUCCEED'
export const CREATE_BOOK_FAILED = 'CREATE_BOOK_FAILED'
export const DELETE_BOOK_REQUESTED = 'DELETE_BOOK_REQUESTED'
export const DELETE_BOOK_SUCCEED = 'DELETE_BOOK_SUCCEED'
export const DELETE_BOOK_FAILED = 'DELETE_BOOK_FAILED'
export const BORROW_BOOK_REQUESTED = 'BORROW_BOOK_REQUESTED'
export const BORROW_BOOK_SUCCEED = 'BORROW_BOOK_SUCCEED'
export const BORROW_BOOK_FAILED = 'BORROW_BOOK_FAILED'
export const RETURN_BOOK_REQUESTED = 'RETURN_BOOK_REQUESTED'
export const RETURN_BOOK_SUCCEED = 'RETURN_BOOK_SUCCEED'
export const RETURN_BOOK_FAILED = 'RETURN_BOOK_FAILED'

export const LOGIN_USER_REQUESTED = 'LOGIN_USER_REQUESTED'
export const LOGIN_USER_SUCCEED = 'LOGIN_USER_SUCCEED'
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED'
export const LOGOUT_USER_REQUESTED = 'LOGOUT_USER_REQUESTED'
export const LOGOUT_USER_SUCCEED = 'LOGOUT_USER_SUCCEED'
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED'
export const REGISTER_USER_SUCCEED = 'REGISTER_USER_SUCCEED'
export const UPDATE_USER_REQUESTED = 'UPDATE_USER_REQUESTED'
export const UPDATE_USER_SUCCEED = 'UPDATE_USER_SUCCEED'
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED'
export const VERIFY_USER_REQUESTED = 'VERIFY_USER_REQUESTED'
export const VERIFY_USER_SUCCEED = 'VERIFY_USER_SUCCEED'
export const VERIFY_USER_FAILED = 'VERIFY_USER_FAILED'
export const HIDE_MESSAGE = 'HIDE_MESSAGE'

export type FetchBookActions =
  | FetchBookRequested
  | FetchBookSucceed
  | FetchBookFailed
  | FetchBookQueryRequested
  | FetchBookQuerySucceed
  | FetchBookQueryFailed
  | EditBookRequested
  | EditBookSucceed
  | EditBookFailed
  | CreateBookSucceed
  | CreateBookFailed
  | DeleteBookRequested
  | DeleteBookSucceed
  | DeleteBookFailed
  | BorrowBookRequested
  | BorrowBookSucceed
  | BorrowBookFailed
  | ReturnBookRequested
  | ReturnBookSucceed
  | ReturnBookFailed
  | HideBookMessage

export type FetchBookRequested = {
  type: typeof BOOK_LIST_REQUESTED
  payload: {
    loading: boolean
    books: any
  }
}

export type FetchBookQueryRequested = {
  type: typeof BOOK_QUERY_REQUESTED
  payload: {
    loading: boolean
  }
}

export type EditBookRequested = {
  type: typeof EDIT_BOOK_REQUESTED
  payload: {
    loading: boolean
  }
}

export type DeleteBookRequested = {
  type: typeof DELETE_BOOK_REQUESTED
  payload: {
    loading: boolean
  }
}

export type BorrowBookRequested = {
  type: typeof BORROW_BOOK_REQUESTED
  payload: {
    loading: boolean
  }
}

export type ReturnBookRequested = {
  type: typeof RETURN_BOOK_REQUESTED
  payload: {
    loading: boolean
  }
}

export type FetchBookSucceed = {
  type: typeof BOOK_LIST_SUCCEED
  payload: {
    loading: boolean
    books: any
  }
}

export type FetchBookQuerySucceed = {
  type: typeof BOOK_QUERY_SUCCEED
  payload: {
    loading: boolean
    books: any
  }
}

export type EditBookSucceed = {
  type: typeof EDIT_BOOK_SUCCEED
  payload: {
    status: 'success',
    message: string
  }
}

export type CreateBookSucceed = {
  type: typeof CREATE_BOOK_SUCCEED
  payload: {
    status: 'success',
    message: string
  }
}

export type DeleteBookSucceed = {
  type: typeof DELETE_BOOK_SUCCEED
  payload: {
    res: any
    bookId: string
  }
}

export type BorrowBookSucceed = {
  type: typeof BORROW_BOOK_SUCCEED
  payload: {
    status: 'success'
    message: string
    book: BookResponse
    user: any
  }
}

export type ReturnBookSucceed = {
  type: typeof RETURN_BOOK_SUCCEED
  payload: {
    status: 'success'
    message: string
    book: BookResponse
    user: any
  }
}

export type FetchBookQueryFailed = {
  type: typeof BOOK_QUERY_FAILED
  payload: {
    loading: boolean
    error: []
  }
}

export type FetchBookFailed = {
  type: typeof BOOK_LIST_FAILED
  payload: {
    loading: boolean
    error: []
  }
}

export type EditBookFailed = {
  type: typeof EDIT_BOOK_FAILED
  payload: {
    status: 'error',
    message: string
  }
}

export type CreateBookFailed = {
  type: typeof CREATE_BOOK_FAILED
  payload: {
    status: 'error',
    message: string
  }
}

export type DeleteBookFailed = {
  type: typeof DELETE_BOOK_FAILED
  payload: {
    loading: boolean
    error: []
  }
}

export type BorrowBookFailed = {
  type: typeof BORROW_BOOK_FAILED
  payload: {
    status: 'error'
    message: string
  }
}

export type ReturnBookFailed = {
  type: typeof RETURN_BOOK_FAILED
  payload: {
    status: 'error'
    message: string
  }
}

export type HideBookMessage = {
  type: typeof HIDE_MESSAGE
}

export type LoginUserActions =
  | LoginUserRequested
  | LoginUserSucceed
  | LoginUserFailed

export type LoginUserRequested = {
  type: typeof LOGIN_USER_REQUESTED
  payload: {
    loading: boolean
  }
}

export type LoginUserSucceed = {
  type: typeof LOGIN_USER_SUCCEED
  payload: {
    data: Partial<User>
    message: string
    status: 'success' | 'error'
  }
}

export type LoginUserFailed = {
  type: typeof LOGIN_USER_FAILED
  payload: {
    status: 'success' | 'error'
    message: string
  }
}

export type LogoutUserActions =
  | LogoutUserRequested
  | LogoutUserSucceed
  | LogoutUserFailed

export type LogoutUserRequested = {
  type: typeof LOGOUT_USER_REQUESTED
  payload: {
    loading: boolean
  }
}

export type LogoutUserSucceed = {
  type: typeof LOGOUT_USER_SUCCEED
  payload: {
    user: '',
    status: 'success',
    message: string
  }
}

export type LogoutUserFailed = {
  type: typeof LOGOUT_USER_FAILED
  payload: {
    status: 'error',
    message: ''
  }
}

export type HideMessage = {
  type: typeof HIDE_MESSAGE
}

export type UpdateUserActions =
  | UpdateUserRequested
  | UpdateUserSucceed
  | UpdateUserFailed

export type UpdateUserRequested = {
  type: typeof UPDATE_USER_REQUESTED
  payload: {
    loading: boolean
  }
}

export type UpdateUserSucceed = {
  type: typeof UPDATE_USER_SUCCEED
  payload: {
    user: Partial<User>
  }
}

export type UpdateUserFailed = {
  type: typeof UPDATE_USER_FAILED
  payload: {
    status: 'error',
    message: string
  }
}

export type RegisterUser = 
| RegisterUserSucceed

export type RegisterUserSucceed = {
    type: typeof REGISTER_USER_SUCCEED
    payload: {
        status: 'success' | 'error'
        message: string
    }
}

export type APIFeedback = {
    message: string,
    status: 'success' | 'error'
}

// ======== //
//  STATES  //
// ======== //

export type BookState = {
  loading: boolean
  allBooks: any
  filteredBooks: any
  errors: any[]
  response: any
  status: 'success' | 'error' | ''
  message: string
}

export type UserState = {
  loading: boolean
  user: any
  status: 'success' | 'error' | ''
  message: string
}

export type AppState = {
  book: BookState
  user: UserState
}

// ======== //
//  MODELS  //
// ======== //

export type Book = {
  isbn: number
  title: string
  authors: string[]
  publisher: string
  publishYear?: number
  categories: string[]
  quantity: number
  status: string
  borrowers: any[]
  imageUrl: string
}

export type User = {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  isAdmin: boolean
  borrows: any[]
  _id: string
}

// ============ //
//  COMPONENTS  //
// ============ //
export type FormStatus = {
  type: string
  message: string
}

export type FormProps = {
  [key: string]: FormStatus
}

export type ActionFeedback = {
  message: string
}

export type RegisterForm = {
  lastName: string
  firstName: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

export type BookInfo = {
  bookInfo: Partial<BookResponse>
}

export type BookResponse = {
  isbn: number
  title: string
  authors: string[]
  publisher: string
  publishYear?: number
  categories: string[]
  quantity: number
  status: string
  borrowers: any[]
  imageUrl: string
  _id: string
}

export type CategoryQuery = {
  categories: string[]
}

export type Authors = {
  authors: string[]
}

export type CreateBookFeedback = {
  type: 'success' | 'error'
  message: string
}

export type EditRouteInfo = {
  bookId: string
}

export type BookAccordionProps = {
  isbn: string
  publisher: string
  publishYear: string
  quantity: number
  categories: string[]
}

export type AuthorProps = {
  authorsState: {
    authors: string[]
  }
}

export type BorrowProps = {
  bookUrl: string,
  quantity: number
}

export type ReturnProps = {
  bookUrl: string
}

export type UserBorrowBook = {
  book: string
}

export type BookActionResponse = {
  message: string
  user: Partial<User>
  book: Book
}

export type SuccessResponse = {
  data: Partial<User>
  message: string
  status: string
}

export type ErrorResponse = {
  status: string
  message: string
}