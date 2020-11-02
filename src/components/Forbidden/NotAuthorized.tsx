import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import ReportIcon from '@material-ui/icons/Report';
import {makeStyles} from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

const useStyles = makeStyles({
  container: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    fontSize: '100px',
    color: '#FFBF00'
  },
});

const NotAuthorizedPage = () => {
  const style = useStyles()
  const history = useHistory()

  useEffect(() => {
    setTimeout(() => history.push('/'), 2000)
  })

  return (
    <Paper classes={{root: style.container}} elevation={0}>
      <ReportIcon classes={{root: style.icon}} />
      <h1> Oops...! Are you lost baby girl? </h1>
      <h4> Redirecting you to homepage... </h4>
    </Paper>
  )
}

export default NotAuthorizedPage