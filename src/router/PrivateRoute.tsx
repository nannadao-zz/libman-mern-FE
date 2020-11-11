import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import { AppState } from '../types'

type PrivateRoute = {
  exact: boolean,
  path: any,
  component: React.ComponentType<any>
  isAuthenticated: boolean
  user: string
}

export const PrivateRoute: React.FC<PrivateRoute> = ({component: Component, isAuthenticated, user, path, ...rest}) => {
  return (
    <Route 
      {...rest}
      render={props => {
        const userId = props.match.params.userId;
        return isAuthenticated ? (
          userId === user 
            ? <Component {...props} />
            : <Redirect to="/forbidden" />
        ) : (
          <Redirect to="/login" />
        )
      }} 
    />
  )
}

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: !!state.user.user,
  user: state.user.user._id
})

export default connect(mapStateToProps)(PrivateRoute)