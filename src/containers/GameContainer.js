import React, { useEffect, useState } from 'react';
import QuestionContainer from './QuestionContainer'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const BASEURL = "https://protected-caverns-01934.herokuapp.com/"

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const GameContainer = (props) => {
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [points, setPoints] = useState(0);
    const [right, setRight] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [answer, setAnswer] = useState("");
    
    useEffect(() => {
        fetch(`${BASEURL}games/${props.location.state.gameId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.token}` // send token back to server
            }
        })
        .then(resp => resp.json())
        .then(data => {
            let questions = data.game.questions.map(newQuestion => {
                let fixedQuestion = fixEntities(newQuestion.question)
                let fixedCorrect = fixEntities(newQuestion.correct)
                let fixedIncorrect1 = fixEntities(newQuestion.incorrect1)
                let fixedIncorrect2 = fixEntities(newQuestion.incorrect2)
                let fixedIncorrect3 = fixEntities(newQuestion.incorrect3)
                let allAnswers = [fixedIncorrect1, fixedIncorrect2, fixedIncorrect3]
                let number = Math.floor(Math.random() * 4);
                allAnswers.splice(number, 0, fixedCorrect);
                return {...newQuestion, question: fixedQuestion, correct:fixedCorrect, incorrect1: fixedIncorrect1, incorrect2: fixedIncorrect2, incorrect3: fixedIncorrect3, allAnswers: allAnswers,}
            })
            setQuestions(questions)
        })
    }, [])
    
    const fixEntities = (string) => {
        const Entities = require('html-entities').AllHtmlEntities;
        const entities = new Entities();
        return entities.decode(string)
    }
    
    const sendQuestion = () => {
        let question = questions[index]
        return question
    }

    const nextQuestion = (number, rightWrong, rightAnswer) => {
        if (rightWrong === "right"){
            setRight(true)
            setWrong(false)
        }
        else{
            setRight(false)
            setWrong(true)
        }
        if (index < questions.length - 1){
            setPoints(points + number)
            setAnswer(rightAnswer)
            setTimeout(() => { setIndex(index + 1) }, 1500)
        }
        else{
            setPoints(points + number)
            setAnswer(rightAnswer)
            setTimeout(()=> {
                const userGameObj = {"usergame": {
                    "score": points
                }}

                const userGameConfig = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userGameObj)
                }
                
                fetch(`${BASEURL}user_games/${localStorage.usergame}`, userGameConfig)
                .then(resp => resp.json())
                .then(data => console.log(data))
                props.history.push({
                    pathname: '/endgame',
                    state: { 
                        gameId: props.location.state.gameId,
                    }
                })
            }, 1500)
        }
    }

    const handleWrongClose = (event, reason) => {
        // if (reason === 'clickaway') {
        //     return;
        // }
        setWrong(false)
    };

    const handleRightClose = (event, reason) => {
        // if (reason === 'clickaway') {
        //     return;
        // }
        setRight(false)
    };

    return(
        <div style={{ textAlign: 'center' }}>
            { questions.length !== 0
            ? <QuestionContainer
                question={sendQuestion()} 
                nextQuestion={nextQuestion}
            /> 
            : null}
            <Snackbar open={wrong} autoHideDuration={1500} onClose={handleWrongClose}>
                <Alert onClose={handleWrongClose} severity="error">
                {`Sorry, the correct answer was "${answer}"!`}
                </Alert>
            </Snackbar>

            <Snackbar open={right} autoHideDuration={1500} onClose={handleRightClose}>
                <Alert onClose={handleRightClose} severity="success">
                {`That is correct!`}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default GameContainer