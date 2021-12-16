import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import DashBoard from './pages/InApp/Dashboard'
import User_admin from './pages/InApp/User'
import Profile from './pages/InApp/Proflie'
import Login from './pages/auth'
// import NotificationList from './pages/InApp/Notification/Notification_List'

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login"/>
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={DashBoard}/>
          <Route exact path="/listuser" component={User_admin}/>
          <Route exact path="/profile" component={Profile}/>
          {/* <Route exact path="/notification" component={NotificationList}/> */}
        </Switch>
      </Router>
    </div>
  )
}

export default App
