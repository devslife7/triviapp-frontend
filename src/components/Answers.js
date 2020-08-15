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
            this.resetState()
            this.props.nextQuestion(1)
        }
        else{
            alert(this.props.correctAnswer)
            this.resetState()
            this.props.nextQuestion(0)
        }
    }

    resetState = () => {
        this.setState({
            selected: ""
        })
    }

    render(){
        return(
        <form onSubmit={this.handleSubmit}>
            <input
                type='radio'
                name='answer-choice'
                checked= {this.state.selected === this.props.allAnswers[0]}
                value={this.props.allAnswers[0]}
                onChange={this.handleChange}
            />
            <label>{this.props.allAnswers[0]}</label><br></br>
            <input
                type='radio'
                name='answer-choice'
                checked= {this.state.selected === this.props.allAnswers[1]}
                value={this.props.allAnswers[1]}
                onChange={this.handleChange}
            />
            <label>{this.props.allAnswers[1]}</label><br></br>
            <input
                type='radio'
                name='answer-choice'
                checked= {this.state.selected === this.props.allAnswers[2]}
                value={this.props.allAnswers[2]}
                onChange={this.handleChange}
            />
            <label>{this.props.allAnswers[2]}</label><br></br>
            <input
                type='radio'
                name='answer-choice'
                checked= {this.state.selected === this.props.allAnswers[3]}
                value={this.props.allAnswers[3]}
                onChange={this.handleChange}
            />
            <label>{this.props.allAnswers[3]}</label><br></br>
            <input type="submit"></input>
        </form>
        )
    }
}

