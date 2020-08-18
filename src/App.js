import React from 'react'
import './App.css'
import GameContainer from "./containers/GameContainer"
import Header from './components/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import 'fontsource-roboto'
import Dashboard from './components/Dashboard'

export default class App extends React.Component {
  state = {
    userData: {}
  }

  render(){
    return (
    < Router>
      <Route path='/' component={Header} />

      <Route exact path='/' render={ routerProps => <LogIn {...routerProps} handleLogin={this.handleLogin} />} />
      <Route exact path='/login' render={ routerProps => <LogIn {...routerProps} handleLogin={this.handleLogin} />} />
      <Route exact path='/signup' render={ routerProps => <SignUp {...routerProps} handleSignup={this.handleSignup} />} />

      <Route exact path='/game' component={GameContainer} />
      <Route exact path='/dashboard' render={ routerProps => <Dashboard {...routerProps} userData={this.state.userData} />} />
    </Router>
    )
  }
}
