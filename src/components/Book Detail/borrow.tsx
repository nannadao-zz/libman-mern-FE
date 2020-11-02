import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import CallReceivedIcon from '@material-ui/icons/CallReceived'

import { BorrowProps, AppState } from '../../types'
import { borrowBook } from '../../redux/actions/bookActions'
import { updateUser } from '../../redux/actions/userActions'

const BookActionBorrow: React.FC<BorrowProps> = ({ bookUrl, quantity }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const loggedIn = useSelector((state: AppState) => state.user)

  const handleBorrow = async () => {
    if (!loggedIn.user) {
      history.push('/login')
    } else if (loggedIn.user) {
      let userId = loggedIn.user._id
      await dispatch(borrowBook(bookUrl))
      await dispatch(updateUser(userId))
    }
  }

  return (
    <Button
      variant="contained"
      size="small"
      endIcon={<CallReceivedIcon />}
      onClick={handleBorrow}
      disableElevation
      disabled={quantity === 0 ? true : false}
    >
      Borrow
    </Button>
  )
}

export default BookActionBorrow