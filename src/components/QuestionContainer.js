import React from 'react';
import Category from './Category';
import Question from './Question';
import Answers from './Answers';

const QuestionContainer = (props) => {
    
    let { category, correct, incorrect1, incorrect2, incorrect3, question } = props.question
    const wrongAnswers = [incorrect1, incorrect2, incorrect3]

    const makeArray = () => {
        let number = Math.floor(Math.random() * 4);
        wrongAnswers.splice(number, 0, correct);
        return(wrongAnswers)
    }

    return(
        <div className="question-container">
            <Category category={category}/>
            <Question question={question}/><br></br>
            <Answers correctAnswer={correct} allAnswers={makeArray()}/>
        </div>
    )
}

export default QuestionContainer;