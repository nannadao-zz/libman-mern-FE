import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { RouteComponentProps } from 'react-router'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'

import Navbar from '../components/Navbar'
import BookAuthor from '../components/Book Detail/author'
import BookActionBorrow from '../components/Book Detail/borrow'
import BookActionReturn from '../components/Book Detail/return'
import BookAccordion from '../components/Book Detail/accordion'
import {
  AppState,
  EditRouteInfo,
  CategoryQuery,
  Authors,
  UserBorrowBook,
} from '../types'
import '../style/BookDetail.css'

const BookDetail = ({ match }: RouteComponentProps<EditRouteInfo>) => {
  const bookId = match.params.bookId
  const data = useSelector((state: AppState) => state.user)
  const { user } = data
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [isbn, setIsbn] = useState('')
  const [publisher, setPublisher] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [authorsState, setAuthors] = useState<Authors>({ authors: [] })
  const [categoriesState, setCategories] = useState<CategoryQuery>({
    categories: [],
  })

  useEffect(() => {
    const fetchBookInfo = async () => {
      let { data } = await axios.get(
        `https://infinite-bayou-72273.herokuapp.com/api/v1/books/${bookId}`,
        {withCredentials: true}
      )
      setImage(data.imageUrl)
      setTitle(data.title)
      setIsbn(data.isbn)
      setPublisher(data.publisher)
      setPublishYear(data.publishYear)
      setQuantity(data.quantity)
      setAuthors({ authors: data.authors })
      setCategories({ categories: data.categories })
    }
    fetchBookInfo()
  }, [bookId])

  return (
    <>
    <Navbar />
    <div className="BookDetail-MainContainer">
      <div className="BookDetail-Image">
          <img
            alt="book cover"
            src={image}
            style={{minWidth: '300px', maxWidth: '320px', height: 'auto'}}
          />
        </div>
      <div className="BookDetail-Info">
          <Typography
            variant="h4"
            component="h1"
          >
            {title}
          </Typography>

          <BookAuthor authorsState={authorsState} />

          <div className="BookDetail-Accordion">
            <BookAccordion
              isbn={isbn}
              publisher={publisher}
              publishYear={publishYear}
              quantity={quantity}
              categories={categoriesState.categories}
            />
          </div>

          <div className="BookDetail-Button">
            {user ? (
              user.borrows.length >= 1 &&
              user.borrows.some(
                (item: UserBorrowBook) => item.book === bookId
              ) ? (
                <BookActionReturn bookUrl={bookId} />
              ) : (
                <BookActionBorrow bookUrl={bookId} quantity={quantity} />
              )
            ) : (
              <BookActionBorrow bookUrl={bookId} quantity={quantity} />
            )}
          </div>

        </div>
    </div>
    </>
  )
}

export default BookDetail