import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AdminRoute from './router/AdminRoute'
import Home from './pages/Home'
import CreateBook from './pages/CreateBook'
import EditBook from './pages/EditBook'
import EditAdmin from './pages/EditAdmin'
import Admin from './pages/Admin'
import Register from './pages/Register'
import LogIn from './pages/Login'
import BookDetail from './pages/BookDetail'
import NotAuthorizedPage from './components/Forbidden/NotAuthorized'

const Routes = () => (
  <Switch>
    <AdminRoute exact={true} path="/admin" component={Admin} />
    <AdminRoute exact={true} path="/admin/books/create" component={CreateBook} />
    <AdminRoute exact={true} path="/admin/books/edit" component={EditAdmin} />
    <AdminRoute exact={true} path="/admin/book/:bookId/edit" component={EditBook} />
    <Route exact path="/" component={Home} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={LogIn} />
    <Route exact path="/book/:bookId" component={BookDetail} />
    <Route exact path="/forbidden" component={NotAuthorizedPage} />
  </Switch>
)

export default Routes
