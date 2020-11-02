import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import { AppState } from '../types'

type AdminRoute = {
  exact: boolean,
  path: string,
  component: React.ComponentType<any>
  isAuthenticated: boolean
  isAdmin: boolean
}

export const AdminRoute: React.FC<AdminRoute> = ({component: Component, isAuthenticated, isAdmin, ...rest}) => {
  return (
    <Route 
      {...rest} 
      component={(props: any) => (
        isAuthenticated ? (
          isAdmin 
            ? <Component {...props} />
            : <Redirect to="/forbidden" />
        ) : (
          <Redirect to="/login" />
        )
      )}
    />
  )
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: !!state.user.user,
  isAdmin: state.user.user.isAdmin
})

export default connect(mapStateToProps)(AdminRoute)