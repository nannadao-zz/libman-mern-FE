import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import CallMadeIcon from '@material-ui/icons/CallMade'

import { returnBook } from '../../redux/actions/bookActions'
import { updateUser } from '../../redux/actions/userActions'
import { ReturnProps, AppState } from '../../types'

const BookActionReturn: React.FC<ReturnProps> = ({ bookUrl }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const loggedIn = useSelector((state: AppState) => state.user)

  const handleReturn = async () => {
    if (!loggedIn.user) {
      history.push('/login')
    } else if (loggedIn.user) {
      let userId = loggedIn.user._id
      await dispatch(returnBook(bookUrl))
      await dispatch(updateUser(userId))
    }
  }

  return (
    <Button
      variant="contained"
      size="small"
      endIcon={<CallMadeIcon />}
      onClick={handleReturn}
      disableElevation
    >
      Return
    </Button>
  )
}

export default BookActionReturn