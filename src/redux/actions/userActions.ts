import { Dispatch } from 'redux'
import axios from 'axios'

import {
  LOGIN_USER_REQUESTED,
  LOGIN_USER_SUCCEED,
  LOGIN_USER_FAILED,
  LOGOUT_USER_REQUESTED,
  LOGOUT_USER_SUCCEED,
  LOGOUT_USER_FAILED,
  HIDE_MESSAGE,
  REGISTER_USER_SUCCEED,
  UPDATE_USER_SUCCEED,
  UPDATE_USER_FAILED,
  User,
  SuccessResponse
} from '../../types'

export const login = (username: string, password: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: LOGIN_USER_REQUESTED })
    const {
      data,
    } = await axios.post('/api/v1/users/login', {
      username,
      password,
    })
    return dispatch(loginSucceed(data))
  } catch (error) {
    return dispatch(loginFailed(error.response.data))
  }
}

export const loginSucceed = (data: SuccessResponse) => {
  return {
    type: LOGIN_USER_SUCCEED,
    payload: data,
  }
}

export const loginFailed = (error: any) => {
  return {
    type: LOGIN_USER_FAILED,
    payload: error,
  }
}

export const logout = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER_REQUESTED })
    const { data } = await axios.get(
      '/api/v1/users/logout'
    )
    return dispatch(logoutSucceed(data))
  } catch (error) {
    return dispatch(logoutFailed(error.response.data))
  }
}

const logoutSucceed = (data: User) => {
  return {
    type: LOGOUT_USER_SUCCEED,
    payload: data
  }
}

const logoutFailed = (error: any) => {
  return {
    type: LOGOUT_USER_FAILED,
    payload: error
  }
}

export const updateUser = (userId: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/users/${userId}`)
    return dispatch(updateUserSucceed(data))
  } catch (error) {
    return dispatch(updateUserFailed(error.response.data))
  }
}

const updateUserSucceed = (data: any) => {
  return {
    type: UPDATE_USER_SUCCEED,
    payload: data
  }
}

const updateUserFailed= (error: any) => {
  return {
    type: UPDATE_USER_FAILED,
    payload: error
  }
}


export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE,
  }
}

export const registerSucceed = (data: any) => {
  return {
    type: REGISTER_USER_SUCCEED,
    payload: data
  }
}