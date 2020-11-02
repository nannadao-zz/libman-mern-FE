import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { GoogleLogin } from 'react-google-login'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { loginSucceed, loginFailed } from '../../redux/actions/userActions'

const GoogleLoginButton = () => {
  const dispatch = useDispatch()

  const googleResponse = async (response: any) => {
    try {
      let res = await axios.post(
        '/auth/google-authenticate',
        { id_token: response.tokenObj.id_token }
      )
      dispatch(loginSucceed({
        data: res.data,
        status: 'success',
        message: 'Login Successfully!'
      }))
    } catch (error) {
      dispatch(loginFailed({
        status: 'error',
        message: 'Please try again!'
      }))
    }
  }

  return (
    <>
      <GoogleLogin
        clientId="1043958463190-iofnt0tfeollg0kjgvo4o7ve6hphrplp.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            variant="text"
            startIcon={<FontAwesomeIcon icon={faGoogle} />}
          >
            Login with Google
          </Button>
        )}
        buttonText="Login"
        onSuccess={googleResponse}
        onFailure={googleResponse}
        cookiePolicy={'single_host_origin'}
      />
    </>
  )
}

export default GoogleLoginButton