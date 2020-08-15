import React from 'react'
import './App.css'
import GameContainer from "./containers/GameContainer"
import LoginSignUpContainer from './containers/LoginSignUpContainer'
import SideBar from './components/SideBar'
import Header from './components/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import ModalDisplay from './components/ModalDisplay'
// import { Button } from '@material-ui/core'

export default class App extends React.Component {

  render(){
    return (
    < Router>
      <ModalDisplay />
      <Route path='/' component={Header} />

      <Route exact path='/' render={ routerProps => <LoginSignUpContainer {...routerProps} />} />
      <Route exact path='/login' component={LogIn} />
      <Route exact path='/signup' component={SignUp} />

      <Route exact path='/game' component={GameContainer} />
    </Router>
    )
  }
}
