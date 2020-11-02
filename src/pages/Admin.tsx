import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

import Navbar from '../components/Navbar'

const useStyle = makeStyles({
  container: {
    height: '100vh',
  },
  actionContainer: {
    alignItems: 'stretch',
    height: '70vh',
  },
  navbar: {
    height: '10vh',
  },
  actions: {
    marginTop: '2rem',
    height: '90vh',
  },
  card: {
    border: '2px solid #D9D9D9',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      border: '2px solid #5386A6',
      cursor: 'pointer',
      '& $icon': {
        color: '#5386A6',
      },
    },
  },
  icon: {
    color: '#D9D9D9',
    fontSize: '80px',
  },
})

const Admin = () => {
  const style = useStyle()
  const history = useHistory()

  const handleCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    history.push('/admin/books/create')
  }

  const handleEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    history.push('/admin/books/edit')
  }

  return (
    <Grid container classes={{ root: style.container }}>
      <Grid
        item
        lg={12}
        md={12}
        sm={12}
        xs={12}
        classes={{ item: style.navbar }}
      >
        <Navbar />
      </Grid>

      <Grid
        item
        lg={12}
        md={12}
        sm={12}
        xs={12}
        classes={{ item: style.actions }}
      >
        <Grid
          container
          spacing={3}
          classes={{ root: style.actionContainer }}
          direction="row"
          justify="center"
          alignItems="stretch"
        >
          <Grid item lg={3} md={5} sm={10} xs={10}>
            <Paper
              elevation={0}
              classes={{ root: style.card }}
              onClick={handleCreate}
            >
              <AddCircleOutlineIcon classes={{ root: style.icon }} />
              <h2> Create a new book </h2>
            </Paper>
          </Grid>

          <Grid item lg={3} md={5} sm={10} xs={10}>
            <Paper elevation={0} classes={{ root: style.card }} onClick={handleEdit}>
              <AddCircleOutlineIcon classes={{ root: style.icon }} />
              <h2> Edit a book </h2>
            </Paper>
          </Grid>

          <Grid item lg={3} md={5} sm={10} xs={10}>
            <Paper elevation={0} classes={{ root: style.card }}>
              <AddCircleOutlineIcon classes={{ root: style.icon }} />
              <h2> Delete a new book </h2>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Admin