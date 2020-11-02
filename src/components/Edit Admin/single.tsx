import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Chip } from '@material-ui/core'

import { BookInfo } from '../../types'
import '../../style/EditAdmin.css'

const EditAdminIndividual: React.FC<BookInfo> = ({ bookInfo }) => {
  const history = useHistory()

  const handleClick = () => {
    let bookId = bookInfo._id
    history.push(`/admin/book/${bookId}/edit`)
  }

  return (
    <>
      <img
        alt="preview of uploaded book"
        src={bookInfo.imageUrl}
        style={{ width: '100px', height: 'auto' }}
        className="EditAdmin-Image"
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
          size="small"
          disableElevation
          onClick={handleClick}
        >
          Edit
        </Button>
      </div>
    </>
  )
}

export default EditAdminIndividual