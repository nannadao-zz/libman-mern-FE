import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

const RegisterButton = () => {
  const history = useHistory()

  const handleRegister = () => {
    history.push('/register')
  }

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        onClick={handleRegister}
      > Register
      </Button>
    </>
  )
}

export default RegisterButton