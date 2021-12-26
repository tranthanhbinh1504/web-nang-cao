import React from 'react'
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