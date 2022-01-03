import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Login from 'src/pages/auth/index'
import DashBoard from 'src/pages/InApp/Dashboard'
import Profile from 'src/pages/InApp/Proflie'
import UserAdmin from 'src/pages/InApp/User'
import ProtectedRoute from './ProtectedRoute'
import LoginRoute from './LoginRoute'

const RootRouter = () => {
  const [token] = useState(localStorage.getItem('token'))
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login"/>
        </Route>
        <LoginRoute token={token} path="/login" component={Login} />

        <ProtectedRoute  token={token} path="/dashboard" component={DashBoard}/>
        <ProtectedRoute  token={token} path="/listuser" component={UserAdmin}/>
        <ProtectedRoute  token={token} path="/profile" component={Profile}/>
      </Switch>
    </Router>
  )
}

export default RootRouter