import React from 'react'
import { useSelector } from 'react-redux'

import { AppState, BookResponse } from '../../types'
import IndividualBook from '../Books/book'
import '../../style/Home.css'

const Books = () => {
  const books = useSelector((state: AppState) => state.book.filteredBooks)

  return (
    <div className="Home-BookContainer" >
      {books.map((book: BookResponse) => (
        <div className="Home-IndividualBook" key={book._id}> 
          <IndividualBook bookInfo={book} />
        </div>
      ))}
    </div>
  )
}

export default Books