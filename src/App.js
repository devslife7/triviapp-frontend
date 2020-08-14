import React from 'react';
import './App.css';
import QuestionContainer from "./components/QuestionContainer"

const BASEURL = "http://localhost:3000/questions/"

export default class App extends React.Component {

  state = {
    questions: [],
    index: 0,
  }

  componentDidMount(){
    console.log("mounted")
    fetch(BASEURL)
    .then(resp => resp.json())
    .then(questions => {
      this.setState({
        questions: questions.map(newQuestion => {
          
          let fixedQuestion = this.fixEntities(newQuestion.question)
          let fixedCorrect = this.fixEntities(newQuestion.correct)
          let fixedIncorrect1 = this.fixEntities(newQuestion.incorrect1)
          let fixedIncorrect2 = this.fixEntities(newQuestion.incorrect2)
          let fixedIncorrect3 = this.fixEntities(newQuestion.incorrect3)
          return {...newQuestion, question: fixedQuestion, correct:fixedCorrect, incorrect1: fixedIncorrect1, incorrect2: fixedIncorrect2, incorrect3: fixedIncorrect3}
          
        })
      })
    })
  }

  fixEntities = (string) => {
    const Entities = require('html-entities').AllHtmlEntities;
    const entities = new Entities();
    return entities.decode(string)
  }

  randomQuestion = () => {
    let number = Math.floor(Math.random()*this.state.questions.length)
    return this.state.questions[number]
  }

  render(){
    return (
    <div className="App">
        {this.state.questions.length !== 0 ? <QuestionContainer question={this.randomQuestion()}/> : null}
    </div>
  );}
}

