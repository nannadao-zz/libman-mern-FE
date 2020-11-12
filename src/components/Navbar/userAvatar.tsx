import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
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
  const { user } = useSelector((state: AppState) => state.user)
  const history = useHistory()

  const handleViewProfile = () => {
    history.push(`/${user._id}`)
  }

  return (
    <>
      <Avatar
        src={user.imageUrl}
        classes={{root: style.avatar}}
        onClick={handleViewProfile}
      />
    </>
  )
}

export default UserAvatar