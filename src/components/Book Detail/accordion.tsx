import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Chip
} from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { BookAccordionProps } from '../../types'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  chip: {
    marginRight: '10px'
  }
})

const BookAccordion: React.FC<BookAccordionProps> = ({
  isbn,
  publisher,
  publishYear,
  quantity,
  description,
  categories
}) => {
  const [expanded, setExpanded] = useState<string | false>('description')
  const style = useStyles()
  
  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <>
      <Accordion
        square
        expanded={expanded === 'description'}
        onChange={handleChange('description')}
      >
        <AccordionSummary
          aria-controls="description-content"
          id="description-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography> Description </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {description}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        square
        expanded={expanded === 'isbn'}
        onChange={handleChange('isbn')}
      >
        <AccordionSummary aria-controls="isbn-content" id="isbn-header" expandIcon={<ExpandMoreIcon />}>
          <Typography> ISBN </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <li> ISBN: {isbn} </li>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'publish'}
        onChange={handleChange('publish')}
      >
        <AccordionSummary aria-controls="publish-content" id="publish-header" expandIcon={<ExpandMoreIcon />}>
          <Typography> Publish </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <li> Publish year: {publishYear} </li>
            <li> Publisher: {publisher} </li>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'genre'}
        onChange={handleChange('genre')}
      >
        <AccordionSummary aria-controls="genre-content" id="genre-header" expandIcon={<ExpandMoreIcon />}>
          <Typography> Genre </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {categories.map(item => (
            <Chip variant="outlined" color="primary" label={item} classes={{root: style.chip}} key={item}/>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'status'}
        onChange={handleChange('status')}
      >
        <AccordionSummary aria-controls="publish-content" id="publish-header" expandIcon={<ExpandMoreIcon />}>
          <Typography> Status </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            { quantity === 0
              ? 
                <Button variant="text" color="secondary" startIcon={<CloseIcon />}>
                  Not Available
                </Button>
              :
                <Button variant="text" color="primary" startIcon={<CheckIcon />}>
                  Available
                </Button>
            }
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default BookAccordion