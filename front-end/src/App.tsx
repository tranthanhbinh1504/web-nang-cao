import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import DashBoard from './pages/InApp/Dashboard'
import Login from './pages/auth'

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
        </Switch>
      </Router>
    </div>
  )
}

export default App
