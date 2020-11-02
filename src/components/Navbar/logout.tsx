import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import { logout } from '../../redux/actions/userActions'

const LogoutButton = () => {
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(logout())
  }

  return (
    <>
      <Button
        variant="text"
        size="small"
        onClick={handleLogout}
      >  Logout
      </Button>
    </>
  )
}

export default LogoutButton