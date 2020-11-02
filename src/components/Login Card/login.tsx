import React, { useState, useEffect } from 'react'
/* import axios from 'axios' */
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import { Button, TextField, Link } from '@material-ui/core'

import { AppState } from '../../types'
import { login, hideMessage } from '../../redux/actions/userActions'
import GoogleLoginButton from '../Navbar/google'
import '../../style/Login.css'

const useStyle = makeStyles({
  body: {
    margin: '4rem',
  },
  form: {
    width: '400px',
    margin: '1rem 0',
    backgroundColor: '#E8E8E8'
  },
  message: {
    margin: '2rem 0',
  },
  button: {
    alignSelf: 'flex-end',
    margin: '0',
    width: '100px'
  },
})

const LoginCard = () => {
  const style = useStyle()
  const history = useHistory()
  const dispatch = useDispatch()
  const userResponse = useSelector((state: AppState) => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { user } = userResponse

  useEffect(() => {
    dispatch(hideMessage())
  }, [dispatch])

  useEffect(() => {
    if (userResponse.status === 'success' && user) {
      setTimeout(() => history.push("/"), 2000)
    }
  }, [userResponse.status, history, user])

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login(username, password))
  }

  const handleRegister = () => {
    history.push('/register')
  }

  return (
    <div className="Login-Card">
      <h1> LOGIN </h1>
        {userResponse.status && userResponse.message ? (
          <Alert
            variant="filled"
            severity={userResponse.status}
            classes={{ root: style.message }}
          >
           {userResponse.message}
          </Alert>
        ) : (
          null
        )}

        <form onSubmit={submitHandler} className="Login-Form">
          <TextField
            classes={{ root: style.form }}
            name="username"
            id="username"
            label="Username"
            variant="outlined"
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            classes={{ root: style.form }}
            name="password"
            id="password"
            label="Password"
            value={password}
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            classes={{ root: style.button }}
            type="submit"
            variant="contained"
            size="large"
            disableElevation
          >
            Login
          </Button>
          
          <div className="Login-Divider">
            <hr/>
            <p> or </p>
            <hr/>
          </div>

          <div className="Login-Google">
            <GoogleLoginButton />
          </div>

          <div className="Login-Register">
            <p> Don't have an account? </p>
            <Link component="span" onClick={handleRegister}> Register </Link>
          </div>
        </form>
    </div>
  )
}

export default LoginCard