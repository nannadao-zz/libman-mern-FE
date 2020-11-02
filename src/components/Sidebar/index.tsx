import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  InputBase,
  Button,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  Chip,
  Input,
  Divider,
  IconButton
} from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search'

import { AppState } from '../../types'
import useCategories from '../../hooks/useCategories'
import { fetchBookQuery } from '../../redux/actions/bookActions'

type Category = {
  categories: string[]
}

const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
  },
  icon: {
    margin: '0 1rem',
  }
})

const Sidebar = () => {
  const style = useStyles()
  const dispatch = useDispatch()
  const books = useSelector((state: AppState) => state.book.allBooks)
  const { categories } = useCategories(books)
  const [titleQuery, setTitleQuery] = useState('')
  const [authorQuery, setAuthorQuery] = useState('')
  const [categoryQuery, setCategoryQuery] = useState<Category>({
    categories: ['any'],
  })
  
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategoryQuery({ categories: event.target.value as string[] })
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleQuery(event.target.value)
  }

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorQuery(event.target.value)
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(fetchBookQuery(titleQuery, authorQuery, categoryQuery))
  }

  const handleRefresh = async () => {
    await setTitleQuery('')
    await setAuthorQuery('')
    await setCategoryQuery({categories: ['any']})
  }

  return (
    <>
      <form className="Home-Sidebar" onSubmit={handleSubmit}>
        <SearchIcon classes={{ root: style.icon }} />
        <InputBase
          placeholder="Search by title"
          inputProps={{ 'aria-label': 'search by title' }}
          value={titleQuery}
          onChange={handleTitleChange}
        />
        <Divider
          orientation="vertical"
          flexItem
          classes={{ root: style.icon }}
        />

        <div className="Sidebar-CategorySearch">
          <InputLabel> Search by category </InputLabel>
          <Select
            multiple
            value={categoryQuery.categories}
            onChange={handleChange}
            input={<Input />}
            renderValue={(selected) => (
              <div className="Sidebar-Chips">
                {(selected as string[]).map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </div>
            )}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox
                  checked={ categoryQuery.categories.indexOf(category) > -1}
                />
                <ListItemText primary={category} />
              </MenuItem>
            ))}
          </Select>
        </div>
        <Divider
          orientation="vertical"
          flexItem
          classes={{ root: style.icon }}
        />
        <SearchIcon />
        <InputBase
          placeholder="Search by author"
          inputProps={{ 'aria-label': 'search by author' }}
          value={authorQuery}
          onChange={handleAuthorChange}
        />

        <Button
          variant="contained"
          size="small"
          type="submit"
          disableElevation={true}
          classes={{ root: style.icon }}
        >
          {' '}
          Search
        </Button>
        
        <IconButton type="submit" onClick={handleRefresh}>
         <RefreshIcon/>
        </IconButton>

      </form>
    </>
  )
}

export default Sidebar