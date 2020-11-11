import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar } from '@material-ui/core'

import { AppState } from '../../types'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: '#2975D9',
    '&:hover': {
      cursor: 'pointer'
    }
  }
})

const UserAvatar = () => {
  const style = useStyles()
  const data = useSelector((state: AppState) => state.user)
  const { user } = data

  return (
    <>
      <Avatar
        src={user.imageUrl}
        classes={{root: style.avatar}}
      />
    </>
  )
}

export default UserAvatar