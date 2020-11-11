import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

import { BookInfo } from "../../types";
import "../../style/DeleteAdmin.css";
import { deleteBook } from "../../redux/actions/bookActions";

const DeleteAdminIndividual: React.FC<BookInfo> = ({ bookInfo }) => {
  const dispatch = useDispatch()

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

  return (
    <>
      <Dialog
        open={deleteDialog}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete?"}</DialogTitle>
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
            disableElevation
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <img
        alt="preview of uploaded book"
        src={bookInfo.imageUrl}
        style={{ width: "100px", height: "auto" }}
        className="DeleteAdmin-Image"
      />
      <p> {bookInfo.title} </p>
      <div>
        {bookInfo.authors?.map((author) => (
          <Chip key={author} label={author} />
        ))}
      </div>
      <p> {bookInfo.isbn} </p>
      <div>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          onClick={handleOpen}
        >
          Delete
        </Button>
      </div>
    </>
  );
};

export default DeleteAdminIndividual;
