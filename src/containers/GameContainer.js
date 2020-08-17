import React, { Component } from 'react'
import QuestionContainer from './QuestionContainer'
// import Modal from '@material-ui/core/Modal';

const BASEURL = "http://localhost:3000/questions/"

export default class GameContainer extends Component {
    
    state = {
        questions: [],
        index: 0,
        points: 0,
        open: false
    }
    
    componentDidMount(){
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
    
    sendQuestion = () => {
        return this.state.questions[this.state.index]
    }

    nextQuestion = (number) => {
        if (this.state.index < 9)
        this.setState({
            index: this.state.index + 1,
            points: this.state.points + number
        })
        else{
            this.setState({
                points: this.state.points + number
            }, alert(`You got ${this.state.points}/10 questions right!`))
            /// here we would want to redirect to home page
            window.location.reload();
        }
    }

    handleOpen = () => {
        this.setState({ open: true })
      }
    
    handleClose = () => {
        this.setState({ open: false })
      }

    // body = () => {
    //     // <div style={modalStyle} className={classes.paper}>
    //     return (
    //         <div>
    //         <h2 id="simple-modal-title">Text in a modal</h2>
    //         <p id="simple-modal-description">
    //             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    //         </p>
    //         {/* <ModalDisplay /> */}
    //         </div>
    //     )
    // }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                { this.state.questions.length !== 0
                ? <QuestionContainer
                    question={this.sendQuestion()} 
                    nextQuestion={this.nextQuestion}/> 
                : null}
                {/* <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {this.body}
                </Modal>
                <button type="button" onClick={this.handleOpen}>Open Modal</button> */}
            </div>
        )
    }
}
