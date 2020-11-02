import React from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot'
import { AppState } from '../../types'

const AdminButton = () => {
  const history = useHistory()
  const data = useSelector((state: AppState) => state.user)
  const { user } = data

  const handleAdmin = () => {
    history.push('/admin')
  }

  return (
    <>
    {user.isAdmin 
      ?
        <Button
          variant="text"
          size="small"
          startIcon={<ScatterPlotIcon />}
          onClick={handleAdmin}
        >
        Admin
        </Button>
      :
        null
    }
    </>
  )
}

export default AdminButton