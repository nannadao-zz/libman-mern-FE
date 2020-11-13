import React from 'react'
import { Typography, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { AuthorProps } from '../../types'

const useStyles = makeStyles({
  author: {
    marginRight: '5px',
  },
})

const BookAuthor: React.FC<AuthorProps> = ({ authorsState }) => {
  const style = useStyles()

  return (
    <Typography variant="subtitle2" component="h2">
      Authors:{' '}
      {authorsState.map((author) => {
        if (
          authorsState.indexOf(author) ===
          authorsState.length - 1
        ) {
          return (
            <Link
              href="#"
              /* onClick={preventDefault} */ key={author}
              classes={{ root: style.author }}
            >
              {author}
            </Link>
          )
        } else {
          return (
            <Link
              href="#"
              /* onClick={preventDefault} */ key={author}
              classes={{ root: style.author }}
            >
              {author},
            </Link>
          )
        }
      })}
    </Typography>
  )
}

export default BookAuthor