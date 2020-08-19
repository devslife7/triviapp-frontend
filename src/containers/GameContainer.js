import React, { Component } from 'react'
import QuestionContainer from './QuestionContainer'
import Modal from 'react-modal'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

Modal.setAppElement('#root') // removes erros caused by Modal

const BASEURL = "http://localhost:3000/games/"

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class GameContainer extends Component {
    
    state = {
        questions: [],
        index: 0,
        points: 0,
        modalIsOpen: false,
        right: false,
        rightAnswer: "",
        wrong: false,
    }
    
    componentDidMount(){
        fetch(`${BASEURL}${this.props.location.state.gameId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.token}` // send token back to server
            }
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                questions: data.game.questions.map(newQuestion => {
                    let fixedQuestion = this.fixEntities(newQuestion.question)
                    let fixedCorrect = this.fixEntities(newQuestion.correct)
                    let fixedIncorrect1 = this.fixEntities(newQuestion.incorrect1)
                    let fixedIncorrect2 = this.fixEntities(newQuestion.incorrect2)
                    let fixedIncorrect3 = this.fixEntities(newQuestion.incorrect3)
                    let allAnswers = [fixedIncorrect1, fixedIncorrect2, fixedIncorrect3]
                    let number = Math.floor(Math.random() * 4);
                    allAnswers.splice(number, 0, fixedCorrect);
                    return {...newQuestion, question: fixedQuestion, correct:fixedCorrect, incorrect1: fixedIncorrect1, incorrect2: fixedIncorrect2, incorrect3: fixedIncorrect3, allAnswers: allAnswers,}
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
        let question = this.state.questions[this.state.index]
        return question
    }

    nextQuestion = (number, rightWrong, rightAnswer) => {
        let right;
        let wrong;
        if (rightWrong === "right"){
            right = true
            wrong = false
        }
        else{
            right = false
            wrong = true
        }
        if (this.state.index < 9){
            this.setState({
                // index: this.state.index + 1,
                points: this.state.points + number,
                rightAnswer: rightAnswer,
                right: right,
                wrong: wrong,
            })
            setTimeout(() => {this.setState({ index: this.state.index +1})}, 1500)
        }
        else{
            this.setState({
                points: this.state.points + number,
                rightAnswer: rightAnswer,
                right: right,
                wrong: wrong,
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

    handleWrongClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        this.setState({
            wrong: false
        });
    };

    handleRightClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        this.setState({
            right: false
        });
    };



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
                    <button onClick={() => this.props.history.push("/dashboard")}>Close</button>
                </Modal>
                { this.state.questions.length !== 0
                ? <QuestionContainer
                    question={this.sendQuestion()} 
                    nextQuestion={this.nextQuestion}
                /> 
                : null}
                <Snackbar open={this.state.wrong} autoHideDuration={1500} onClose={this.handleWrongClose}>
                    <Alert onClose={this.handleClose} severity="error">
                    {`Sorry, the correct answer was "${this.state.rightAnswer}"!`}
                    </Alert>
                </Snackbar>

                <Snackbar open={this.state.right} autoHideDuration={1500} onClose={this.handleRightClose}>
                    <Alert onClose={this.handleWrongClose} severity="success">
                    {`That is correct!`}
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}
