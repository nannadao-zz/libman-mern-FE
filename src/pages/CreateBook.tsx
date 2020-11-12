import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
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
import { AppState, Authors, CategoryQuery } from '../types'
import { hideBookMessage, createBookSucceed, createBookFailed } from '../redux/actions/bookActions'
import '../style/CreateBook.css'

const useStyle = makeStyles({
  form: {
    backgroundColor: '#E8E8E8',
    margin: '1rem 0',
  }
})

const CreateBook = () => {
  const style = useStyle()
  const history = useHistory()
  const dispatch = useDispatch()
  const bookResponse = useSelector((state: AppState) => state.book)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [isbn, setIsbn] = useState('')
  const [publisher, setPublisher] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [quantity, setQuantity] = useState('')
  const [image, setImage] = useState('')
  const [authorsState, setAuthors] = useState<Authors>({ authors: [] })
  const [authorField, setAuthorField] = useState('')
  const [categoriesState, setCategories] = useState<CategoryQuery>({
    categories: ['any'],
  })
  const [categoryField, setCategoryField] = useState('')

  useEffect(() => {
    dispatch(hideBookMessage())
  }, [dispatch])

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        'https://infinite-bayou-72273.herokuapp.com/api/v1/books/create',
        {
          imageUrl: image,
          title: title,
          isbn: parseInt(isbn),
          publisher: publisher,
          publishYear: parseInt(publishYear),
          quantity: parseInt(quantity),
          authors: authorsState.authors,
          categories: categoriesState.categories,
        },
        {withCredentials: true}
      )
      await dispatch(createBookSucceed(res.data))
      if (res.data.status === 'success') {
        setTimeout(() => history.push('/', 3000))
      }
    } catch (error) {
      dispatch(createBookFailed(error.response.data))
    }
  }

  const handleDelete = (event: any) => {
    let newAuthorsState = authorsState.authors
    let index = newAuthorsState.indexOf(event.target.label)
    newAuthorsState.splice(index, 1)
    setAuthors({ authors: newAuthorsState })
  }

  const handleDelete2 = (event: any) => {
    let newCategoriesState = categoriesState.categories
    let index = newCategoriesState.indexOf(event.target.label)
    newCategoriesState.splice(index, 1)
    setCategories({ categories: newCategoriesState })
  }

  const handleAddAuthor = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setAuthors({
      authors: [...authorsState.authors, authorField],
    })
  }

  const handleAddCategory = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setCategories({
      categories: [...categoriesState.categories, categoryField],
    })
  }

  const handleUpload = async (e: React.ChangeEvent<any>) => {
    const files = e.target.files
    const form = new FormData()
    form.append('file', files[0])
    form.append('upload_preset', 'libman')
    form.append('cloud_name', 'dapyxdvj5')
    setUploadLoading(true)
    const { data } = await axios.post(
      'https://api.cloudinary.com/v1_1/dapyxdvj5/image/upload',
      form
    )
    setImage(data.secure_url)
    setUploadLoading(false)
  }

  return (
    <>
      <Navbar />
      <div className="CreateBook-MainContainer">
        <h1> CREATE A BOOK </h1>
        <div className="CreateBook-Alert">
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
        </div>
        <form onSubmit={submitHandler} className="CreateBook-Form">
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
            value={isbn}
            required
            type="text"
            variant="outlined"
            onChange={(e) => setIsbn(e.target.value)}
          />

          <TextField
            classes={{ root: style.form }}
            name="authors"
            id="authors"
            label="Authors"
            value={authorField}
            type="text"
            variant="outlined"
            required
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
            {' '}
            authors:
            {authorsState.authors.length >= 1 &&
              authorsState.authors.map((item) => {
                return (
                  <Chip
                    key={item}
                    label={item}
                    onDelete={item === 'any' ? undefined : handleDelete}
                  />
                )
              })}
          </div>

          <TextField
            classes={{ root: style.form }}
            name="publisher"
            id="publisher"
            label="Publisher"
            value={publisher}
            type="text"
            variant="outlined"
            required
            onChange={(e) => setPublisher(e.target.value)}
          />

          <TextField
            classes={{ root: style.form }}
            name="publishYear"
            id="publishYear"
            label="Publish Year"
            value={publishYear}
            type="text"
            variant="outlined"
            required
            onChange={(e) => setPublishYear(e.target.value)}
          />

          <TextField
            classes={{ root: style.form }}
            name="categories"
            id="categories"
            label="Categories"
            value={categoryField}
            type="text"
            variant="outlined"
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
                    onDelete={item === 'any' ? undefined : handleDelete2}
                  />
                )
              })}
          </div>

          <TextField
            classes={{ root: style.form }}
            name="quantity"
            id="quantity"
            label="Quantity"
            value={quantity}
            type="text"
            variant="outlined"
            required
            onChange={(e) => setQuantity(e.target.value)}
          />

          <div className="CreateBook-Upload" >
            <p> Upload image </p>
            <input
              type="file"
              name="file"
              placeholder="Upload an image"
              required
              onChange={handleUpload}
            />
            {uploadLoading ? (
              <p> Upoading... </p>
            ) : (
              image && (
                <img
                  alt="preview of uploaded book"
                  src={image}
                  style={{ width: '200px', height: 'auto' }}
                />
              )
            )}
          </div>
          <div className="CreateBook-Button">
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disableElevation
            >
              CREATE BOOK
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateBook