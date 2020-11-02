import React, {useState, useEffect} from 'react'
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
  const [abbreviation, setAbbreviation] = useState('')
  const data = useSelector((state: AppState) => state.user)
  const { user } = data

  useEffect(() => {
    const getNameAbbreviation = () => {
      let firstName = user.firstName
      let lastName = user.lastName
      let string = `${firstName} ${lastName}`
      const abbreviation = string
        .split(/\s/)
        .reduce((abbreviation, word) => (abbreviation += word.slice(0, 1)), '')
      setAbbreviation(abbreviation)
    }
    getNameAbbreviation()
  }, [user.firstName, user.lastName])

  return (
    <>
      <Avatar classes={{ root: style.avatar }}> {abbreviation} </Avatar>
    </>
  )
}

export default UserAvatar