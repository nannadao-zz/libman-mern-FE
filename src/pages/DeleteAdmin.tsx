import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Alert from '@material-ui/lab/Alert'

import Navbar from '../components/Navbar'
import { AppState, BookResponse } from '../types'
import DeleteAdminIndividual from '../components/Delete Admin/single'
import { hideBookMessage } from '../redux/actions/bookActions'
import '../style/DeleteAdmin.css'

const DeleteAdmin = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const bookResponse = useSelector((state: AppState) => state.book)
  useEffect(() => {
    dispatch(hideBookMessage())
  }, [dispatch])

  useEffect(() => {
    if (bookResponse.message === 'TokenExpiredError') {
      setTimeout(() => history.push("/login"), 2000)
    }
  })

  return (
    <>  
      <Navbar />
      <div className="DeleteAdmin-MainContainer">
        <h1> ALL BOOKS </h1>

        {bookResponse.status && bookResponse.message ? (
          <Alert
            variant="filled"
            severity={bookResponse.status}
          >
           {bookResponse.message}
          </Alert>
        ) : (
          null
        )}

        <div className="DeleteAdmin-List">
          {bookResponse.allBooks.map((book: BookResponse) => (
            <div key={book._id} className="DeleteAdmin-Single"> 
              <DeleteAdminIndividual bookInfo={book} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default DeleteAdmin