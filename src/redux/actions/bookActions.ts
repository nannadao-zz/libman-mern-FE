import { Dispatch } from 'redux'
import axios, { AxiosResponse } from 'axios'

import {
  BOOK_LIST_REQUESTED,
  BOOK_LIST_SUCCEED,
  BOOK_LIST_FAILED,
  BOOK_INDIVIDUAL_REQUESTED,
  BOOK_INDIVIDUAL_SUCCEED,
  BOOK_INDIVIDUAL_FAILED,
  BOOK_QUERY_REQUESTED,
  BOOK_QUERY_SUCCEED,
  BOOK_QUERY_FAILED,
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
  CategoryQuery,
  ErrorResponse,
} from '../../types'

export const fetchBookList = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: BOOK_LIST_REQUESTED })
    const { data } = await axios.get(
      'https://infinite-bayou-72273.herokuapp.com/api/v1/books/all',
      { withCredentials: true }
    )
    return dispatch(fetchBookSucceed(data))
  } catch (error) {
    return dispatch(fetchBookFailed(error))
  }
}

export const fetchIndividualBook = (bookId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: BOOK_INDIVIDUAL_REQUESTED})
    const { data } = await axios.get(
      `https://infinite-bayou-72273.herokuapp.com/api/v1/books/${bookId}`,
      { withCredentials: true }
    )
    return dispatch(fetchBookIndividualSucceed(data))
  } catch (error) {
    return dispatch(fetchBookIndividualFailed(error.response.data))
  }
}

export const fetchBookQuery = (
  titleQuery: string,
  authorQuery: string,
  categoryQuery: CategoryQuery
) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: BOOK_QUERY_REQUESTED })
    if (titleQuery || authorQuery || categoryQuery) {
      const { data } = await axios.get(
        'https://infinite-bayou-72273.herokuapp.com/api/v1/books', 
        {
          params: {
            title: titleQuery,
            authors: authorQuery,
            categories: categoryQuery.categories,
          },
          withCredentials: true
        }
      )
      return dispatch(fetchBookQuerySucceed(data))
    }
  } catch (error) {
    return dispatch(fetchBookQueryFailed(error))
  }
}

export const deleteBook = (bookId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: DELETE_BOOK_REQUESTED})
    if(bookId) {
      const res = await axios.delete(
        `https://infinite-bayou-72273.herokuapp.com/api/v1/books/${bookId}`,
        { withCredentials: true }
      )
      /* return dispatch(deleteBookSucceed(data, bookId)) */
      if (res.status === 200 && res.data.status === "success") {
        await dispatch(deleteBookSucceed(res.data, bookId));
      } else if (res.status === 200 && res.data.message === 'TokenExpiredError') {
        await dispatch(deleteBookFailed(res.data))
      }
    }
  } catch (error) {
    return dispatch(deleteBookFailed(error.response.data))
  }
}

export const borrowBook = (bookUrl: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: BORROW_BOOK_REQUESTED})
    const res = await axios.put(
      `https://infinite-bayou-72273.herokuapp.com/api/v1/books/${bookUrl}/borrow`,
      {},
      { withCredentials: true }
    )
    if (res.status === 200 && res.data.status === "success") {
      return dispatch(borrowBookSucceed(res.data));
    } else if (res.status === 200 && res.data.message === 'TokenExpiredError') {
      return dispatch(borrowBookFailed(res.data))
    }
  } catch (error) {
    return dispatch(borrowBookFailed(error.response.data))
  }
}

export const returnBook = (bookUrl: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({type: RETURN_BOOK_REQUESTED})
    if (bookUrl) {
      const res = await axios.put(
        `https://infinite-bayou-72273.herokuapp.com/api/v1/books/${bookUrl}/return`,
        {},
        { withCredentials: true }
      )
      if (res.status === 200 && res.data.status === "success") {
        return dispatch(returnBookSucceed(res.data));
      } else if (res.status === 200 && res.data.message === 'TokenExpiredError') {
        return dispatch(returnBookFailed(res.data))
      }
    }
  } catch (error) {
    return dispatch(returnBookFailed(error.response.data))
  }
}

export const editBookSucceed = (data: any) => {
  return {
    type: EDIT_BOOK_SUCCEED,
    payload: data
  }
}

const fetchBookSucceed = (data: any) => {
  return {
    type: BOOK_LIST_SUCCEED,
    payload: data,
  }
}

const fetchBookIndividualSucceed = (data: any) => {
  return {
    type: BOOK_INDIVIDUAL_SUCCEED,
    payload: data
  }
}

const fetchBookQuerySucceed = (data: any) => {
  return {
    type: BOOK_QUERY_SUCCEED,
    payload: data,
  }
}

export const createBookSucceed = (data: any) => {
  return {
    type: CREATE_BOOK_SUCCEED,
    payload: data
  }
}

const deleteBookSucceed = (data: any, bookId: string) => {
  return {
    type: DELETE_BOOK_SUCCEED,
    payload: {
      data,
      bookId
    }
  }
}

const borrowBookSucceed = (borrowResponse: any) => {
  return {
    type: BORROW_BOOK_SUCCEED,
    payload: borrowResponse
  }
}

const returnBookSucceed = (returnResponse: any) => {
  return {
    type: RETURN_BOOK_SUCCEED,
    payload: returnResponse
  }
}

const fetchBookFailed = (error: AxiosResponse) => {
  return {
    type: BOOK_LIST_FAILED,
    payload: error,
  }
}

const fetchBookIndividualFailed = (error: any) => {
  return {
    type: BOOK_INDIVIDUAL_FAILED,
    payload: error
  }
}

const fetchBookQueryFailed = (error: AxiosResponse) => {
  return {
    type: BOOK_QUERY_FAILED,
    payload: error,
  }
}

export const editBookFailed = (error: any) => {
  return {
    type: EDIT_BOOK_FAILED,
    payload: error
  }
}

export const createBookFailed = (error: ErrorResponse) => {
  return {
    type: CREATE_BOOK_FAILED,
    payload: error
  }
}

const deleteBookFailed = (error: AxiosResponse) => {
  return {
    type: DELETE_BOOK_FAILED,
    payload: error
  }
}

const borrowBookFailed = (error: ErrorResponse) => {
  return {
    type: BORROW_BOOK_FAILED,
    payload: error
  }
}

const returnBookFailed = (error: ErrorResponse) => {
  return {
    type: RETURN_BOOK_FAILED,
    payload: error
  }
}

export const hideBookMessage = () => {
  return {
    type: HIDE_MESSAGE,
  }
}