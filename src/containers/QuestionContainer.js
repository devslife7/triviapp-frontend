import React, { useState, useEffect } from 'react';
import Category from '../components/Category';
import Question from '../components/Question';
import Answers from '../components/Answers';

const QuestionContainer = (props) => {
    
    let { category, correct, allAnswers, question } = props.question



    return(
        <div className="question-container">
            <Category category={category}/>
            <Question question={question}/><br></br>
            <Answers correctAnswer={correct} allAnswers={allAnswers} nextQuestion={props.nextQuestion}/>
        </div>
    )
}

export default QuestionContainer;