import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import CallMadeIcon from '@material-ui/icons/CallMade'

import { returnBook } from '../../redux/actions/bookActions'
import { updateUser, logout } from '../../redux/actions/userActions'
import { ReturnProps, AppState } from '../../types'

const BookActionReturn: React.FC<ReturnProps> = ({ bookUrl }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const userResponse = useSelector((state: AppState) => state.user);
  const bookResponse = useSelector((state: AppState) => state.book);
  
  useEffect(() => {
    if (
      userResponse.message === "TokenExpiredError" || 
      userResponse.message === "No valid token. Please log in!" || 
      bookResponse.message === "TokenExpiredError") {
      dispatch(logout())
      history.push("/login")
    }
  })

  const handleReturn = async () => {
    if (!userResponse.user) {
      history.push('/login')
    } else if (userResponse.user) {
      let userId = userResponse.user._id
      await dispatch(returnBook(bookUrl))
      dispatch(updateUser(userId))
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