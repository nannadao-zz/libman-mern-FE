import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import {
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import VisibilityIcon from '@material-ui/icons/Visibility'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import { AppState, BookInfo } from '../../types'
import { deleteBook } from '../../redux/actions/bookActions'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    maxHeight: '450px'
  },
  media: {
    height: '300px',
    width: '200px',
    alignSelf: 'center',
  },
  text: {
    fontSize: '18px',
    fontWeight: 'bold',
    fontFamily: 'Rubik, sans-serif',
    marginBottom: '8px',
  },
  button: {
    margin: '0.5rem 1rem 0 0',
  },
})

const IndividualBook: React.FC<BookInfo> = ({ bookInfo }) => {
  const style = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const data = useSelector((state: AppState) => state.user)
  const { user } = data

  const [deleteDialog, setDeleteDialog] = useState(false)

  const handleOpen = () => {
    setDeleteDialog(true)
  }
  const handleClose = () => {
    setDeleteDialog(false)
  }
  const handleDelete = () => {
    if (bookInfo._id) {
      dispatch(deleteBook(bookInfo._id))
    }
  }
  const handleEdit = () => {
    history.push(`/admin/book/${bookInfo._id}/edit`)
  }

  const handleView = () => {
    history.push(`/book/${bookInfo._id}`)
  }

  return (
    <>
      <Dialog
        open={deleteDialog}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting book title: <strong> {bookInfo.title} </strong> <br></br>
            Choose 'Delete' to confirm!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="secondary"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Card classes={{ root: style.container }} key={bookInfo.title}>
        <CardMedia
          classes={{ root: style.media }}
          image={bookInfo.imageUrl}
          title="book cover"
        />
        <CardContent>
          <Typography classes={{ root: style.text }}>
            {bookInfo.title}
          </Typography>

          {bookInfo.authors?.map((author) => (
            <span
              key={author}
              style={{ marginRight: '10px', fontStyle: 'italic' }}
            >
              {' '}
              {author}{' '}
            </span>
          ))}

          <div>
            {bookInfo.quantity === 0 ? (
              <Button
                variant="text"
                color="secondary"
                startIcon={<CloseIcon />}
              >
                Not Available
              </Button>
            ) : (
              <Button variant="text" color="primary" startIcon={<CheckIcon />}>
                Available
              </Button>
            )}

            <IconButton onClick={handleView}>
              <VisibilityIcon />
            </IconButton>
          </div>

          {user.isAdmin && (
            <div>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<EditIcon />}
                classes={{ root: style.button }}
                onClick={handleEdit}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color="secondary"
                size="small"
                startIcon={<DeleteIcon />}
                classes={{ root: style.button }}
                onClick={handleOpen}
              >
                Delete
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default IndividualBook