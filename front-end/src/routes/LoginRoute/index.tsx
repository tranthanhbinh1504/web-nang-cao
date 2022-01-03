import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'
interface Props extends RouteProps {
  token?: string| null,
}
const LoginRoute = ({token,...routeProps}: Props) => {
  if (token == 'abcdef') {
    return <Redirect to='/dashboard' />
  }
  return <Route {...routeProps} />
}
export default LoginRoute