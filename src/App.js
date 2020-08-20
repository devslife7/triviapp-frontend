import React from 'react'
import './App.css'
import GameContainer from "./containers/GameContainer"
import Header from './components/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import 'fontsource-roboto'
import Dashboard from './components/Dashboard'
import GameLobby from './components/GameLobby'
import CreateGame from './components/CreateGame'
import Friends from './components/Friends'
import JoinGame from './components/JoinGame'
import EndGame from './components/EndGame'

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

      <Route exact path='/game' render={ routerProps => <GameContainer {...routerProps}/>} />
      <Route exact path='/friends' component={Friends} />
      <Route exact path='/dashboard' render={ routerProps => <Dashboard {...routerProps} userData={this.state.userData} />} />
      <Route exact path='/gamelobby' render={ routerProps => <GameLobby {...routerProps} username={localStorage.username}/>} />
      <Route exact path='/creategame' render={ routerProps => <CreateGame {...routerProps} username={localStorage.username}/>} />
      <Route exact path='/joingame' render={ routerProps => <JoinGame {...routerProps} username={localStorage.username}/>} />
      <Route exact path='/endgame' render={ routerProps => <EndGame {...routerProps} username={localStorage.username}/>}/>
    </Router>
    )
  }
}
