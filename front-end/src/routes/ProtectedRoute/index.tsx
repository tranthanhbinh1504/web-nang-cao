import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'

interface Props extends RouteProps {
  token?: string| null,
}
const ProtectedRoute = ( {token,...routeProps}: Props) => {
  if (token == 'abcdef') {
    return <Route {...routeProps}/>
  }
  return <Redirect to='/login' />
}
export default ProtectedRoute