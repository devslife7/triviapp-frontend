import React from 'react';

export default class Question extends React.Component{


    render(){
        return(
        <div className="question">{this.props.question}</div>
        )
    }
}