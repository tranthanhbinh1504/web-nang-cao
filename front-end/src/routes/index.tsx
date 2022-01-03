import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Login from 'src/pages/auth/index'
import DashBoard from 'src/pages/InApp/dashboard'
import Profile from 'src/pages/InApp/profile'
import UserAdmin from 'src/pages/InApp/user'



const RootRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login"/>
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={DashBoard}/>
        <Route exact path="/listuser" component={UserAdmin}/>
        <Route exact path="/profile" component={Profile}/>
      </Switch>
    </Router>
  )
}

export default RootRouter