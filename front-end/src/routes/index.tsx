import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Login from 'src/pages/auth/index'
import DashBoard from 'src/pages/InApp/dashboard'
import NotificationDetail from 'src/pages/InApp/notifcationDetail'
import NotificationsPage from 'src/pages/InApp/notification'
import Profile from 'src/pages/InApp/profile'
import UserAdmin from 'src/pages/InApp/user'
import LoginRoute from './LoginRoute'
import ProtectedRoute from './ProtectedRoute'
const RootRouter = () => {
  const [token] = useState(localStorage.getItem('token'))
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login"/>
        </Route>
        <LoginRoute token={token} path="/login" component={Login} />
        <ProtectedRoute token={token} path="/dashboard" component={DashBoard}/>
        <ProtectedRoute token={token} path="/listuser" component={UserAdmin}/>
        <ProtectedRoute token={token} path="/profile" component={Profile}/>
        <ProtectedRoute token={token} path="/notification" component={NotificationsPage}/>
        <ProtectedRoute token={token} path="/notificationDetail/:id/" component={NotificationDetail}/>
      </Switch>
    </Router>
  )
}

export default RootRouter