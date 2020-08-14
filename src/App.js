import React from 'react';
import './App.css';
import GameContainer from "./containers/GameContainer"



export default class App extends React.Component {


  render(){
    return (
    <div className="App">
        <GameContainer />
    </div>
  );}
}

