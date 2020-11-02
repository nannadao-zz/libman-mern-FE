import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

const LoginButton = () => {
  const history = useHistory()

  const handleLogin = () => {
    history.push('/login')
  }

  return (
    <>
      <Button
        variant="text"
        size="small"
        onClick={handleLogin}
      > Login
      </Button>
    </>
  )
}

export default LoginButton