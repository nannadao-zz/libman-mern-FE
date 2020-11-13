import React, { useEffect } from 'react'
import { Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CallReceivedIcon from '@material-ui/icons/CallReceived'

import { BorrowProps, AppState } from '../../types'
import { borrowBook } from '../../redux/actions/bookActions'
import { updateUser, logout } from '../../redux/actions/userActions'

const BookActionBorrow: React.FC<BorrowProps> = ({ bookUrl, quantity }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const userResponse = useSelector((state: AppState) => state.user);
  const bookResponse = useSelector((state: AppState) => state.book);

  useEffect(() => {
    if (
      userResponse.message === "TokenExpiredError" || 
      bookResponse.message === "TokenExpiredError" ||
      userResponse.message === "No valid token. Please log in!") {
      dispatch(logout())
      history.push("/login")
    }
  });

  const handleBorrow = async () => {
    if (!userResponse.user) {
      history.push('/login')
    } else if (userResponse.user) {
      let userId = userResponse.user._id
      await dispatch(borrowBook(bookUrl))
      dispatch(updateUser(userId))
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