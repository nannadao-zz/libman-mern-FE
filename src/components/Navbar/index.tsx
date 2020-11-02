import React from 'react'
import { useSelector } from 'react-redux'

import { useHistory } from 'react-router-dom'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { AppState } from '../../types'
import LoginButton from './login'
import LogoutButton from './logout'
import AdminButton from './admin'
import RegisterButton from './register'
import UserAvatar from './userAvatar'

const useStyle = makeStyles({
  title: {
    fontFamily: 'Lato, sans-serif',
    fontSize: '28px',
    color: '#044BD9',
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  }
})

const Navbar = () => {
  const style = useStyle()
  const history = useHistory()
  const data = useSelector((state: AppState) => state.user)
  const { user } = data

  const handleHome = () => {
    history.push('/')
  }

  return (
    <AppBar elevation={0} position="fixed">
      <Toolbar>
        <Typography classes={{ root: style.title }} onClick={handleHome}>
          {' '}
          LibMan{' '}
        </Typography>
        
      </Toolbar>
      {user ? (
        <Toolbar>
          <AdminButton />
          <UserAvatar />
          <LogoutButton />
        </Toolbar>
      ) : (
        <Toolbar>
          <LoginButton />
          <RegisterButton />
        </Toolbar>
      )}
    </AppBar>
  )
}

export default Navbar