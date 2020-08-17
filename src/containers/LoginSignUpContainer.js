import React from 'react'
import LogIn from '../components/LogIn'
import SignUp from '../components/SignUp'
import { Route, Link } from 'react-router-dom'

const LoginSignUpContainer = ({ match }) => {
  return (
    <>
      <Route exact path={match.url} component={LogIn} />
    </>
  )
}

export default LoginSignUpContainer
