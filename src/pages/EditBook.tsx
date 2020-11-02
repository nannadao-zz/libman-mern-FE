import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { RouteComponentProps } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import {
  Button,
  TextField,
  Chip,
  InputAdornment,
  IconButton,
} from '@material-ui/core'

import Navbar from '../components/Navbar'
import {
  Authors,
  CategoryQuery,
  EditRouteInfo,
  AppState
} from '../types'
import { editBookSucceed, editBookFailed, hideBookMessage } from '../redux/actions/bookActions'
import '../style/EditBook.css'

const useStyle = makeStyles({
  form: {
    backgroundColor: '#E8E8E8',
    margin: '1rem 0',
  }
})

const EditBook = ({ match }: RouteComponentProps<EditRouteInfo>) => {
  const style = useStyle()
  const history = useHistory()
  const dispatch = useDispatch()
  const bookResponse = useSelector((state: AppState) => state.book)
  const bookId = match.params.bookId
  const [title, setTitle] = useState('')
  const [isbn, setIsbn] = useState('')
  const [publisher, setPublisher] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [quantity, setQuantity] = useState('')
  const [authorsState, setAuthors] = useState<Authors>({ authors: [] })
  const [authorField, setAuthorField] = useState('')
  const [categoriesState, setCategories] = useState<CategoryQuery>({
    categories: [],
  })
  const [categoryField, setCategoryField] = useState('')

  useEffect(() => {
    dispatch(hideBookMessage())
  }, [dispatch])

  useEffect(() => {
    const fetchBookInfo = async () => {
      let { data } = await axios.get(
        `/api/v1/books/${bookId}`
      )
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

  const handleAddAuthor = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setAuthors({
      authors: [...authorsState.authors, authorField]
    })
  }

  const handleDeleteAuthor = (item: string) => () => {
    const newAuthors = authorsState.authors
    let removeItemIndex = newAuthors.indexOf(item)
    newAuthors.splice(removeItemIndex, 1)
    setAuthors({authors: newAuthors})
  }

  const handleAddCategory = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setCategories({
      categories: [...categoriesState.categories, categoryField]
    })
  }

  const handleDeleteCategory = (item: string) => () => {
    const newCategories = categoriesState.categories
    let removeItemIndex = newCategories.indexOf(item)
    newCategories.splice(removeItemIndex, 1)
    setCategories({categories: newCategories})
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await axios.put(
        `/api/v1/books/${bookId}`,
        {
          title: title,
          isbn: parseInt(isbn),
          publisher: publisher,
          publishYear: parseInt(publishYear),
          quantity: parseInt(quantity),
          authors: authorsState.authors,
          categories: categoriesState.categories,
        }
      )
      await dispatch(editBookSucceed(res.data))
      if (res.status === 200) {
        setTimeout(() => history.push("/"), 1500)
      }
    } catch (error) {
      dispatch(editBookFailed(error.response.data))
    }
  }

  return (
    <>
      <Navbar />
      <div className="EditBook-MainContainer">
        <h1> EDITING: {title} </h1>
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
        <form onSubmit={handleSubmit} className="EditBook-Form">
          <TextField
            classes={{ root: style.form }}
            name="title"
            id="title"
            label="Title"
            value={title}
            type="text"
            variant="outlined"
            required
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            classes={{ root: style.form }}
            name="isbn"
            id="isbn"
            label="ISBN Number"
            variant="outlined"
            value={isbn}
            required
            type="text"
            onChange={(e) => setIsbn(e.target.value)}
          />

          <TextField
            classes={{ root: style.form }}
            name="authors"
            id="authors"
            label="Authors"
            variant="outlined"
            value={authorField}
            type="text"
            onChange={(e) => setAuthorField(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleAddAuthor}>
                    <AddCircleIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div style={{ margin: '0' }}>
            authors:
            {authorsState.authors.length >= 1 &&
              authorsState.authors.map((item) => {
                return (
                  <Chip
                    key={item}
                    label={item}
                    onDelete={handleDeleteAuthor(item)}
                  />
                )
              })}
          </div>

          <TextField
            classes={{ root: style.form }}
            name="publisher"
            id="publisher"
            label="Publisher"
            variant="outlined"
            value={publisher}
            type="text"
            required
            onChange={(e) => setPublisher(e.target.value)}
          />

          <TextField
            classes={{ root: style.form }}
            name="publishYear"
            id="publishYear"
            label="Publish Year"
            variant="outlined"
            value={publishYear}
            type="text"
            required
            onChange={(e) => setPublishYear(e.target.value)}
          />

          <TextField
            classes={{ root: style.form }}
            name="categories"
            id="categories"
            label="Categories"
            variant="outlined"
            value={categoryField}
            type="text"
            onChange={(e) => setCategoryField(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleAddCategory}>
                    <AddCircleIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div style={{ margin: '0' }}>
            {' '}
            categories:
            {categoriesState.categories.length >= 1 &&
              categoriesState.categories.map((item) => {
                return (
                  <Chip
                    key={item}
                    label={item}
                    onDelete={
                      item === 'any' ? undefined : handleDeleteCategory(item)
                    }
                  />
                )
              })}
          </div>

          <TextField
            classes={{ root: style.form }}
            name="quantity"
            id="quantity"
            label="Quantity"
            variant="outlined"
            value={quantity}
            type="text"
            required
            onChange={(e) => setQuantity(e.target.value)}
          />
          
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disableElevation
          >
            EDIT BOOK
          </Button>
        </form>
      </div>
    </>
  )
}

export default EditBook