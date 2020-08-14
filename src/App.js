import React from 'react'
import './App.css'
import GameContainer from "./containers/GameContainer"
import LoginSignUpContainer from './containers/LoginSignUpContainer'
import SideBar from './components/SideBar'
import Header from './components/Header'
// import { Button } from '@material-ui/core'

export default class App extends React.Component {

  render(){
    return (
    <div className="App">
        <Header />
        <LoginSignUpContainer />
        <SideBar />
        <GameContainer />
    </div>
    )
  }
}
