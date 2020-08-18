import React, { Component } from 'react'
import QuestionContainer from './QuestionContainer'
import Modal from 'react-modal'
Modal.setAppElement('#root') // removes erros caused by Modal

const BASEURL = "https://cryptic-badlands-72293.herokuapp.com/questions"

export default class GameContainer extends Component {
    
    state = {
        questions: [],
        index: 0,
        points: 0,
        modalIsOpen: false
    }
    
    componentDidMount(){
        fetch(BASEURL, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.token}` // send token back to server
            }
        })
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
            }, this.setModalIsOpen)
        }
    }

    handleOpen = () => this.setState({ open: true })
    handleClose = () => this.setState({ open: false })

    setModalIsOpen = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        })
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                {/* <button onClick={ () => this.setModalIsOpen() }>Open Modal</button> */}
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() => this.setModalIsOpen() }
                    style={
                        {
                            overlay: {
                                // background: ''
                            },
                            content: {
                                borderRadius: '20px',
                                margin: '140px 750px 550px 750px',
                                textAlign: 'center'
                            }
                        }
                    }
                >
                    <h2>Game Over</h2>
                    <p>{`You got ${this.state.points}/10 questions right!`}</p>
                    <button onClick={() => window.location.reload()}>Close</button>
                </Modal>
                { this.state.questions.length !== 0
                ? <QuestionContainer
                    question={this.sendQuestion()} 
                    nextQuestion={this.nextQuestion}/> 
                : null}
            </div>
        )
    }
}
