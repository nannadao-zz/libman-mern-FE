import React from 'react'
import { useSelector } from 'react-redux'

import Navbar from '../components/Navbar'
import { AppState, BookResponse} from '../types'
import EditAdminIndividual from '../components/Edit Admin/single'
import '../style/EditAdmin.css'

const EditAdmin = () => {
  const bookResponse = useSelector((state: AppState) => state.book)

  return (
    <>
      <Navbar />
      <div className="EditAdmin-MainContainer">
        <h1> ALL BOOKS </h1>
      
        <div className="EditAdmin-List">
          {bookResponse.allBooks.map((book: BookResponse) => (
            <div key={book._id} className="EditAdmin-Single"> 
              <EditAdminIndividual bookInfo={book} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default EditAdmin