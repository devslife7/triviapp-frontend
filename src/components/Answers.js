import React from 'react';


export default class Answers extends React.Component{

    constructor(){
        super();
        this.state = {
            selected: "",
        }
    }



    handleChange= (e) => {
        this.setState({
            selected: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.selected === this.props.correctAnswer){
            alert("You're a genius!!!")
            window.location.reload(false);
        }
        else{
            alert(this.props.correctAnswer)
            window.location.reload(false);
        }
    }

    render(){
        return(
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <input type='radio' name='answer-choice' value={this.props.allAnswers[0]}></input>
            <label>{this.props.allAnswers[0]}</label><br></br>
            <input type='radio' name='answer-choice' value={this.props.allAnswers[1]}></input>
            <label>{this.props.allAnswers[1]}</label><br></br>
            <input type='radio' name='answer-choice' value={this.props.allAnswers[2]}></input>
            <label>{this.props.allAnswers[2]}</label><br></br>
            <input type='radio' name='answer-choice' value={this.props.allAnswers[3]}></input>
            <label>{this.props.allAnswers[3]}</label><br></br>
            <input type="submit"></input>
        </form>
        )
    }
}

