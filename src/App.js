import React from 'react'
import './App.css'
import GameContainer from "./containers/GameContainer"
import Header from './components/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import ModalDisplay from './components/ModalDisplay'
// import { Button } from '@material-ui/core'



export default class App extends React.Component {

  state = {
    username: "",
    password: "",
  }

  

  handleChange = (e) => {
    console.dir(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  

  render(){
    console.log(this.props)
    return (
    < Router>
      <ModalDisplay />
      <Route path='/' component={Header} />

      <Route exact path='/' render={ routerProps => <LogIn {...routerProps} handleLogin={this.handleLogin} handleChange={this.handleChange} />} />
      <Route exact path='/login' render={ routerProps => <LogIn {...routerProps} handleLogin={this.handleLogin} handleChange={this.handleChange} />} />
      <Route exact path='/signup' render={ routerProps => <SignUp {...routerProps} handleSignup={this.handleSignup} handleChange={this.handleChange} />} />

      <Route exact path='/game' component={GameContainer} />
    </Router>
    )
  }
}
